'use strict';

var _ = require('lodash');
var Pin = require('./pin.model');

// Get list of pins
exports.index = function(req, res) {
  if(req.query.longitude && req.query.latitude) {
    // get the max distance or set it to 1 kilometer
    var maxDistance = Number(req.query.distance) || 1000;
    // get coordinates [ <longitude> , <latitude> ]
    var coords = [];
    coords[0] = parseFloat(req.query.longitude);
    coords[1] = parseFloat(req.query.latitude);

    var query = {};
    query.location = {
      $near: {
        $geometry : {
          type: 'Point',
          coordinates: coords
        },
        $maxDistance: maxDistance
      }
    }

    Pin.find(query, function(err, pins) {
      if(err) { return handleError(res, err); }
      return res.status(200).json(pins);
    });
  } else {
    Pin.find(function (err, pins) {
      if(err) { return handleError(res, err); }
      return res.status(200).json(pins);
    });
  }
};

// Get a single pin
exports.show = function(req, res) {
  Pin.findById(req.params.id, function (err, pin) {
    if(err) { return handleError(res, err); }
    if(!pin) { return res.status(404).send('Not Found'); }
    return res.json(pin);
  });
};

// Creates a new pin in the DB.
exports.create = function(req, res) {
  req.body.author = req.user._id;
  Pin.create(req.body, function(err, pin) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(pin);
  });
};

// Updates an existing pin in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Pin.findById(req.params.id, function (err, pin) {
    if (err) { return handleError(res, err); }
    if(!pin) { return res.status(404).send('Not Found'); }
    var updated = _.merge(pin, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(pin);
    });
  });
};

// Deletes a pin from the DB.
exports.destroy = function(req, res) {
  Pin.findById(req.params.id, function (err, pin) {
    if(err) { return handleError(res, err); }
    if(!pin) { return res.status(404).send('Not Found'); }
    pin.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}