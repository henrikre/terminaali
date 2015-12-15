'use strict';

var Pin = require('./pin.model');
var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('Pins controller', function() {

  before(function(done) {
    // Seed pins
    Pin.find({}).remove(function() {
      Pin.create({
        name: 'Eteläsatama',
        info: 'The largest port in Helsinki.',
        activity: ['entertainment'],
        location: {
          type: 'Point',
          coordinates: [24.958802635582064,60.16075728592842]
        }
      }, {
        name: 'Esplanadi',
        info: 'A small park in the very heart of Helsinki.',
        activity: ['food & drink'],
        location: {
          type: 'Point',
          coordinates: [24.947586635582063,60.16759576206797]
        }
      }, function(err) {
        if (err) {
          console.log(err, 'finished populating pins');
          done();
        };
          console.log('finished populating pins');
          done();
        }
      );
    });
  });

  describe('Getting all pins', function() {

    it('should respond with JSON array of 2 pins', function(done) {
      request(app)
        .get('/api/pins')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Array).with.lengthOf(2);
          done();
        });
    });

  });

  describe('Getting pins within 500m of a point', function() {

    it('should respond with JSON array with one pin', function(done) {
      request(app)
        .get('/api/pins?longitude=24.957383271067755&latitude=60.15832523242134&distance=500')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Array).with.lengthOf(1);
          done();
        });
    });

  });

  describe('Creating a new pin', function() {
    var token = null;

    before(function(done) {
      request('http://localhost:9000')
        .post('/auth/local')
        .send({ email: 'test@test.com', password: 'test' })
        .end(function(err, res) {
          if (err) return done(err);
          token = 'Bearer ' + res.body.token;
          done();
        });
    });

    var newPin = {
        "name": "Länsisatama",
        "location": {
            "type": "Point",
            "coordinates": [
                24.921049347223295,
                60.15434410700485
            ]
        }
    }

    it('should respond with json of the added pin and a status of 201', function(done) {
      request('http://localhost:9000')
        //.set('Authorization', token)
        .post('/api/pins')
        .set({ 'Authorization': token })
        .send(newPin)
        .expect(201)
        //.expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          res.body.should.be.instanceof(Object);
          done();
        });
    });
  });

});