require('dotenv').config();
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js');

const User = require('../models/user');
const CodeSubmission = require('../models/codeSub');

chai.config.includeStack = true;

const { expect } = chai;
const should = chai.should();
chai.use(chaiHttp);

let token;

/**
 * root level hooks
 */
after(function (done) {
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

const SAMPLE_OBJECT_ID = 'aaaaaaaaaaaa'; // 12 byte string
const SAMPLE_SUBMISSION_ID = 'bbbbbbbbbbbb'; // 12 byte string

describe('Code submission API endpoints', function () {
  // Create a sample user for use in tests.
  beforeEach(function (done) {
    const sampleUser = new User({
      username: 'myuser',
      email: 'test@test.com',
      password: 'mypassword',
      _id: SAMPLE_OBJECT_ID,
    });
    sampleUser.save()
      .then(function (user) {
        const sampleSubmission = new CodeSubmission({
          repo: 'testRepo',
          owner: 'myusername',
          oid: 'main',
          _id: SAMPLE_SUBMISSION_ID,
          user: user._id,
        });
        chai.request(app)
          .post('/user/signup')
          .send(sampleUser)
          .end(function (err, res) {
            if (err) { done(err); }
            sampleSubmission.save()
            token = res.body.token;
            done();
          });
      });
  });

  // Delete sample user.
  afterEach(function (done) {
    User.deleteMany({ username: 'myuser' })
      .then(function () {
        CodeSubmission.deleteMany({ repo: ['testRepo', 'anotherRepo'] })
      })
      .then(function () {
        done();
      });
  });

  it('should show a code submission analysis', function (done) {
    chai.request(app)
      .get(`/submission/${SAMPLE_SUBMISSION_ID}`)
      .set('Authorization', `Bearer ${token}`)
      .end( function (err, res) {
        if (err) { done(err); }
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should post a new submission', function (done) {
    chai.request(app)
      .post('/submission/new')
      .send({ owner: 'anotherusername', repo: 'anotherRepo' })
      .set('Authorization', `Bearer ${token}`)
      .end(function (err, res) {
        if (err) { done(err); }
        expect(res.body.submission).to.be.an('object');
        expect(res.body.submission).to.have.property('owner', 'anotherusername');

        // check that user is actually inserted into database
        CodeSubmission.findOne({ owner: 'anotherusername' }).then(function (submission) {
          expect(submission).to.be.an('object');
          done();
        });
      });
  });
});
