'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
  categoryid: {type:Schema.ObjectId,ref:"Category"},
  productname: String,
});

module.exports = mongoose.model('Product', ProductSchema);