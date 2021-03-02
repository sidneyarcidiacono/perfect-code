require('dotenv').config();
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js');

const User = require('../models/user.js');

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

describe('User API endpoints', function () {
  // Create a sample user for use in tests.
  beforeEach(function (done) {
    const sampleUser = new User({
      username: 'myuser',
      password: 'mypassword',
      email: 'test@test.com',
      _id: SAMPLE_OBJECT_ID,
    });
    sampleUser.save()
      .then(function () {
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

  // Delete sample user.
  afterEach(function (done) {
    User.deleteMany({ username: ['myuser', 'anotheruser'] })
      .then(function () {
        done();
      });
  });

  it('should get one user', function (done) {
    chai.request(app)
      .get(`/user/${SAMPLE_OBJECT_ID}`)
      .set('Authorization', `Bearer ${token}`)
      .end(function (err, res) {
        if (err) { done(err); }
        expect(res).to.have.status(200);
        expect(res.body.user).to.be.an('object');
        expect(res.body.user.username).to.equal('myuser');
        done();
      });
  });

  it('should post a new user', function (done) {
    chai.request(app)
      .post('/user/signup')
      .send({ username: 'anotheruser', email: 'test@test.com', password: 'mypassword' })
      .end(function (err, res) {
        if (err) { done(err); }
        expect(res.body.user).to.be.an('object');
        expect(res.body.user).to.have.property('username', 'anotheruser');

        // check that user is actually inserted into database
        User.findOne({ username: 'anotheruser' }).then(function (user) {
          expect(user).to.be.an('object');
          done();
        });
      });
  });

  it('should update a user', function(done) {
    chai.request(app)
      .put(`/user/${SAMPLE_OBJECT_ID}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ username: 'mynewusername' })
      .end(function (err, res) {
        if (err) { done(err); }
        expect(res).to.have.status(200)
        expect(res.body.user).to.be.an('object')
        expect(res.body.user).to.have.property('username', 'mynewusername')
      })
  })

  it('should sign in a user', function (done) {
    chai.request(app)
      .post('/user/signin')
      .send({ username: 'anotheruser', password: 'mypassword' })
      .end( function (err, res) {
        console.log(`Err line 95 sign in: ${err}`)
        if (err) { done(err); }
        expect(res).to.have.status(200);
        // expect(res.body.token).to.be.a('string');
        done();
      });
  });

  it('should delete a user', function (done) {
    chai.request(app)
      .delete(`/user/${SAMPLE_OBJECT_ID}`)
      .set('Authorization', `Bearer ${token}`)
      .end( function (err, res) {
        if (err) { done(err); }
        expect(res).to.have.status(204);

        // check that user is actually deleted from database
        User.findOne({ username: 'myuser' }).then(function (user) {
          expect(user).to.equal(null);
          done();
        });
      });
  });
});
