'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
  category: String,
});

module.exports = mongoose.model('Category', CategorySchema);