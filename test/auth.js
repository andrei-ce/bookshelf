// process.env.ENV_NODE = 'test';

const app = require('../server');
const { connectDb, disconnectDb } = require('../utils/dbConnection');
const expect = require('chai').expect;
const request = require('supertest');

const config = require('config');
const jwt = require('jsonwebtoken');

//===============================================================================================
// GLOBAL VARIABLES
//===============================================================================================
var testUsers = {
  login: {
    correct: {
      email: 'registered@test.com',
      password: '123456',
    },
    wrongPassword: {
      email: 'registered@test.com',
      password: 'wrongPassword',
    },
  },
  register: {
    correct: {
      username: 'Testerson',
      email: 'registered@test.com',
      password: '123456',
    },
    shortUsername: {
      username: 't',
      email: 'registered@test.com',
      password: '123456',
    },
    wrongEmailFormat: {
      username: 'Testerson',
      email: 'registeredtest.com',
      password: '123456',
    },
    shortPassword: {
      username: 'Testerson',
      email: 'registered@test.com',
      password: '1234',
    },
  },
};

//set up global variables to store token & decoded token (user Id)
let tokens = {
  valid: '',
  invalid:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjAyNmQ2MWYyZTM1ZTBmNGMwYzkxZDJlIn0sImlhdCI6MTYxMzMyXKXKMiwiZXhwIjoxNjEzNDA5NzMyfQ.jjh6fPvzq5p3pMzEO03sZ_7J8Qqt_B5FrmzEsByAb6I',
};

let id = '';
let id2 = ''; //they must match

//===============================================================================================
// UNIT TESTS FOR AUTHENTICATION:
//===============================================================================================
describe('TESTS REQUESTS REGARDING AUTHENTICATION /auth', () => {
  before((done) => {
    connectDb()
      .then(() => done())
      .catch((err) => done(err));
  });

  after((done) => {
    disconnectDb()
      .then(() => done())
      .catch((err) => done(err));
  });

  it('FAILS to register user with incorrect email input', (done) => {
    request(app)
      .post('/auth/register')
      .send(testUsers.register.wrongEmailFormat)
      .then((res) => {
        errorObj = res.body;
        expect(res.error.status).to.eql(422);
        expect(errorObj.errors[0].msg).to.eql('Please include a valid email');
        done();
      })
      .catch((err) => done(err));
  });

  it('FAILS to register user with short password', (done) => {
    request(app)
      .post('/auth/register')
      .send(testUsers.register.shortPassword)
      .then((res) => {
        errorObj = res.body;
        expect(res.error.status).to.eql(422);
        expect(errorObj.errors[0].msg).to.eql(
          'Password needs to have at least 6 characters'
        );
        done();
      })
      .catch((err) => done(err));
  });

  it('FAILS to register user with short username', (done) => {
    request(app)
      .post('/auth/register')
      .send(testUsers.register.shortUsername)
      .then((res) => {
        errorObj = res.body;
        expect(res.error.status).to.eql(422);
        expect(errorObj.errors[0].msg).to.eql(
          'Please include a username of min 3 characters'
        );
        done();
      })
      .catch((err) => done(err));
  });

  it('SUCCEEDS in registering a new user', (done) => {
    request(app)
      .post('/auth/register')
      .send(testUsers.register.correct)
      .then((res) => {
        tokens.valid = res.body.token;
        jwt.verify(tokens.valid, config.get('JWT_SECRET'), (error, decoded) => {
          if (error) {
            throw error;
          } else {
            id = decoded.user.id;
          }
        });
        expect(res.statusCode).to.eql(201);
        expect(tokens.valid).to.be.a('string').that.has.length(183);
        expect(id).to.be.a('string').that.has.length(24);
        done();
      })
      .catch((err) => done(err));
  });

  it('FAILS to load a user with invalid token', (done) => {
    request(app)
      .get('/auth')
      .set('x-auth-token', tokens.invalid)
      .then((res) => {
        errorObj = res.body;
        expect(res.error.status).to.eql(401);
        expect(errorObj.errors[0].msg).to.eql('Invalid token');
        done();
      })
      .catch((err) => done(err));
  });

  it('SUCCEEDS to load a user when sending a valid token', (done) => {
    request(app)
      .get('/auth')
      .set('x-auth-token', tokens.valid)
      .then((res) => {
        userLoaded = res.body;
        expect(userLoaded).to.contain.all.keys('username', 'email', '_id');
        expect(userLoaded.username).to.eql('Testerson');
        expect(userLoaded.email).to.eql('registered@test.com');
        done();
      })
      .catch((err) => done(err));
  });

  it('FAILS to log in a user with incorrect password', (done) => {
    request(app)
      .post('/auth/login')
      .send(testUsers.login.wrongPassword)
      .then((res) => {
        errorObj = res.body;
        expect(res.error.status).to.eql(400);
        expect(errorObj.errors[0].msg).to.eql('Invalid credentials');
        done();
      })
      .catch((err) => done(err));
  });

  it('SUCCEEDS to log in user with correct credentials', (done) => {
    request(app)
      .post('/auth/login')
      .send(testUsers.login.correct)
      .then((res) => {
        jwt.verify(tokens.valid, config.get('JWT_SECRET'), (error, decoded) => {
          if (error) {
            throw error;
          } else {
            id2 = decoded.user.id;
          }
        });
        expect(res.body.token).to.be.a('string').that.has.length(183);
        expect(res.statusCode).to.eql(200);
        expect(id2).to.eql(id);
        expect(id2).to.be.a('string').that.has.length(24);
        done();
      })
      .catch((err) => done(err));
  });

  // DELETED test user
  it('SUCCEEDS in deleting testUser', (done) => {
    request(app)
      .delete('/auth/deleteTestUser')
      .then((res) => {
        msg = res.body.msg;
        expect(res.statusCode).to.eql(200);
        expect(msg).to.be.a('string').eql('Test user deleted!');
        done();
      })
      .catch((err) => done(err));
  });
});
