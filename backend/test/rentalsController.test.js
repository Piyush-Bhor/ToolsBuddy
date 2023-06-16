const { expect } = require('chai');
const app = require('../app');
const request = require('supertest')(app);
const mongoose = require('mongoose');
const Rental = require('../models/rentalModel');
const sinon = require('sinon');
const db_url = require('../config/testConfig');
const testConfig = require('../config/testConfig');

// test MongoDB database connection
const testDbUrl = testConfig.dbURL;

// getRentalByID
describe('getRentalByID', () => {
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

  /*
  beforeEach(async () => {
    // Clear the rentals collection in the test database before each test
    await Rental.deleteMany({});
  });
  */

  it('should return a rental when a valid ID is provided', async () => {
    const response = await request.get(`/rentals/getRentalByID/648bfa5addc05eb7f31269b4`).expect(200);

    expect(response.body).to.be.an('object');
    expect(response.body.itemName).to.equal('Test Rental');
    expect(response.body.itemDescription).to.equal('This is a test rental');
    expect(response.body.itemPrice).to.equal(100.5);

  });

  it('should return 404 error when an invalid ID is provided', async () => {
    const invalidID = '647e6256cf9632b4ec39bbe4';

    const response = await request.get(`/rentals/getRentalByID/${invalidID}`).expect(404);

    expect(response.text).to.equal('Listing Not Found');
  });
/*
  it('should return 500 error when an error occurs during retrieval', async () => {
    // Stub the findOne method of the Rental model to throw an error
    const findOneStub = sinon.stub(Rental, 'findOne').throws(new Error('Test error'));

    const validID = '647e67accf9632b4ec39bbe7';

    const response = await request.get(`/rentals/getRentalByID/${validID}`).expect(500);

    expect(response.text).to.equal('Error Retrieving Listing');

    // Restore the original findOne method
    findOneStub.restore();
  });
  */
});

