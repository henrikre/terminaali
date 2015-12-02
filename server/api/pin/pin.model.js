'use strict';

var User = require('../user/user.model'),
	mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PinSchema = new Schema({
  name: { type: String, required: true },
  info: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  activity: {
    type: String,
    enum: ['entertainment', 'food & drink', 'nightlife', 'underground']
  }
  location: {
  	type: { type: String, default: 'Point' },
  	coordinates: { type: [Number] }
  },
  createdAt: { type: Date, default: Date.now }
});

PinSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Pin', PinSchema);