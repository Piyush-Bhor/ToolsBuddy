const { expect } = require('chai');
const app = require('../app');
const request = require('supertest')(app);
const mongoose = require('mongoose');
const testConfig = require('../config/testConfig');

// test MongoDB database connection
const testDbUrl = testConfig.dbURL;

// get Rented Items By ID
describe('getRentedItemsByID', () => {
  before(async () => {
    try {
      if (mongoose.connection.readyState === 0) {
        await mongoose.connect(testDbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
      }
    } catch (err) {
      console.error('Error connecting to test database:', err);
    }
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it('should return a list of rented items when a valid ID is provided', async () => {
    const validID = '647e6256cf9632b4ec39bbe4';

    const response = await request.get('/profile/getRentedItems/647e6256cf9632b4ec39bbe1').expect(200);
    expect(response.body).to.be.an('array');
  });

  it('should return 500 error when an invalid ID is provided', async () => {
    const invalidID = '647e6256cf9632b4ec39bbe8';

    const response = await request.get(`/profile/getRentedItems/${invalidID}`).expect(500);
    expect(response.text).to.equal('Error Retrieving Listing');
  });
});


// get Lended Items By ID
describe('getLendedItemsByID', () => {
  before(async () => {
    try {
      if (mongoose.connection.readyState === 0) {
        await mongoose.connect(testDbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
      }
    } catch (err) {
      console.error('Error connecting to test database:', err);
    }
  });

  after(async () => {
    await mongoose.disconnect();
  });

  it('should return a list of lended items when a valid ID is provided', async () => {
    const validID = '647e6256cf9632b4ec39bbe4';

    const response = await request.get('/profile/getLendItems/647e6256cf9632b4ec39bbe4').expect(200);
    expect(response.body).to.be.an('array');
  });

  it('should return 500 error when an invalid ID is provided', async () => {
    const invalidID = '647e6256cf9632b4ec39bbe8';

    const response = await request.get(`/profile/getLendItems/${invalidID}`).expect(500);
    expect(response.text).to.equal('Error Retrieving Listing');
  });
});
