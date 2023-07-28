const { expect } = require('chai');
const app = require('../app');
const request = require('supertest')(app);
const mongoose = require('mongoose');
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

  it('should return a rental when a valid ID and item number are provided', async () => {
    const validID = '647e6256cf9632b4ec39bbe1';
    const itemNum = 0;

    //const response = await request.get(`/rentals/getRentalByID/${validID}/${itemNum}`).expect(200);
    const response = await request.get('/rentals/getRentalByID/647e6256cf9632b4ec39bbe1/0').expect(200);
    const rentalItem = response.body;

    expect(rentalItem).to.be.an('object');
  });

  it('should return 404 error when an invalid ID is provided', async () => {
    const invalidID = '647e6256cf9632b4ec39bbe8';
    const itemNum = 0;

    const response = await request.get(`/rentals/getRentalByID/${invalidID}/${itemNum}`).expect(404);

    expect(response.text).to.equal('Rental Not Found');
  });

  it('should return 404 error when an invalid item number is provided', async () => {
    const validID = '647e6256cf9632b4ec39bbe1';
    const invalidItemNum = 999;

    const response = await request.get(`/rentals/getRentalByID/${validID}/${invalidItemNum}`).expect(404);

    expect(response.text).to.equal('Item Not Found');
  });
});

// getAllRentals
describe('getAllRentals', () => {
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

  it('should return all rentals', async () => {
    const response = await request.get('/rentals/getAllRentals').expect(200);

    expect(response.body).to.be.an('array');
  });
});

// searchRentalsByTags
describe('searchRentalsByTags', () => {
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

  it('should return rentals by tags', async () => {
    const tags = ['gardening', 'lawn', 'tools'];

    const response = await request.get(`/rentals/searchRentalsByTags/${tags.join(',')}`).expect(200);

    expect(response.body).to.be.an('array');
  });

  it('should return 404 error when no rentals are found for the provided tags', async () => {
    const invalidTags = ['human centipede', 'lady gaga', 'God'];

    const response = await request.get(`/rentals/searchRentalsByTags/${invalidTags.join(',')}`).expect(404);

    expect(response.text).to.equal('Listings Not Found');
  });

  it('should return 404 error when tags parameter is not provided as a comma-separated list', async () => {
    const invalidTags = 'tools gardening';

    const response = await request.get(`/rentals/searchRentalsByTags/${invalidTags}`).expect(404);

    expect(response.text).to.equal('Listings Not Found');
  });
});

// searchRentalsByItemName
describe('searchRentalsByItemName', () => {
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

  it('should return rentals by item name', async () => {
    const itemName = 'gardening tool';

    const response = await request.get('/rentals/searchRentalsByItemName/Waffle Maker').expect(200);

    expect(response.body).to.be.an('array');
  });

  it('should return 404 error when no rentals are found for the provided item name', async () => {
    const invalidItemName = 'non-existing item';

    const response = await request.get(`/rentals/searchRentalsByItemName/${invalidItemName}`).expect(404);

    expect(response.text).to.equal('Listings Not Found');
  });
});
