"use strict";

var Backbone = require('backbone');
var Joi = require('joi');

var League = Backbone.Model.extend({}, {
  getSchema: function () {
    return Joi.object().keys({
      name: Joi.string().min(1).max(50).required()
    });
  }
});

module.exports = League;
