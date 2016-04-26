"use strict";

var Backbone = require('backbone'),
  Joi = require('joi');

var Team = Backbone.Model.extend({
  defaults: {
    name: 'F.C. Fake node.js Team'
  }
}, {
  getSchema: function () {
    return Joi.object().keys({
      name: Joi.string().min(3).max(50).required()
    });
  }
});

module.exports = Team;
