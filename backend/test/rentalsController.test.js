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

    const total_users = 4; // Total number of enteries in the database

    expect(response.body).to.be.an('array');
    expect(response.body).to.have.length(total_users);

  });
});

// get Rentals by Tags
describe('getRentalsByTags', () => {
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
    const results = 2;
  
    const response = await request.get(`/rentals/getRentalsByTags/${tags.join(',')}`).expect(200);
  
    expect(response.body).to.be.an('array');
    expect(response.body).to.have.length(results);
  
    it('should return 404 error when no rentals are found for the provided tags', async () => {
      const invalidTags = ['human centipede', 'lady gaga', 'God'];
    
      const response = await request.get(`/rentals/getRentalsByTags/${invalidTags.join(',')}`).expect(404);
    
      expect(response.text).to.equal('Listings Not Found');
    });
    
    it('should return 400 error when tags parameter is missing', async () => {
      const response = await request.get('/rentals/getRentalsByTags').expect(400);
    
      expect(response.text).to.equal('Invalid tags');
    });
    
    it('should return 404 error when tags parameter is not provided as a comma-separated list', async () => {
      const invalidTags = 'tools gardening';
    
      const response = await request.get(`/rentals/getRentalsByTags/${invalidTags}`).expect(404);
      
    });
  });
});

