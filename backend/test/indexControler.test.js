const { expect } = require('chai');
const app = require('../app'); 
const request = require('supertest')(app);

describe('Home Page', () => {
  it('should return a welcome message', (done) => {
    request.get('/')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.equal('Welcome');
        done();
      });
  });
});