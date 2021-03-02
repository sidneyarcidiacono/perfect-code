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
      .then((user) => {
        const sampleSubmission = new CodeSubmission({
          repo: 'testRepo',
          owner: 'myusername',
          oid: 'main',
          _id: SAMPLE_SUBMISSION_ID,
          user: user._id,
        });
        return sampleSubmission.save()
          .then(() => {
            chai.request(app)
              .post('/user/signup')
              .send(sampleUser)
              .end((err, res) => {
                if (err) { done(err); }
                token = res.body.token;
                done();
              });
          });
      });
  });

  // Delete sample user.
  afterEach(function (done) {
    User.deleteMany({ username: 'myuser' })
      .then(() => CodeSubmission.deleteMany({ repo: 'testRepo' }))
      .then(() => {
        done();
      });
  });

  it('should show a code submission analysis', function (done) {
    chai.request(app)
      .get(`/submission/${SAMPLE_SUBMISSION_ID}`)
      .end((err, res) => {
        if (err) { done(err); }
        expect(res).to.have.status(200);
        // expect(res.body).to.be.an('object');
        // expect(res.body.progress).to.be.a('number');
        // expect(res.body.analysisResults).to.be.an('object');
        done();
      });
  });

  it('should post a new submission', function (done) {
    chai.request(app)
      .post('/submission/new')
      .send({ owner: 'anotherusername', repo: 'anotherRepo' })
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        if (err) { done(err); }
        expect(res.body.submission).to.be.an('object');
        expect(res.body.submission).to.have.property('owner', 'anotherusername');

        // check that user is actually inserted into database
        CodeSubmission.findOne({ owner: 'anotherusername' }).then((submission) => {
          expect(submission).to.be.an('object');
          done();
        });
      });
  });

  it('should delete a code submission', function (done) {
    chai.request(app)
      .delete(`/submission/delete/${SAMPLE_SUBMISSION_ID}`)
      .end((err, res) => {
        if (err) { done(err); }
        expect(res).to.have.status(204);

        // check that user is actually deleted from database
        CodeSubmission.findOne({ _id: SAMPLE_SUBMISSION_ID }).then((submission) => {
          expect(submission).to.equal(null);
          done();
        });
      });
  });
});
