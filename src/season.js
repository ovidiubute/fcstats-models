"use strict";

var Backbone = require('backbone');
var Match = require('./match');
var Joi = require('joi');

var SeasonMatches = Backbone.Collection.extend({
  model: Match,

  modelId: function (attrs) {
    return attrs.matchId
  }
});

var Season = Backbone.Model.extend({
  defaults: {
    yearStart: 1900,
    yearEnd: 1901,
    leagueName: null
  }
}, {
  getSchema: function () {
    return Joi.object().keys({
      yearStart: Joi.number().integer().min(1970).max(2100).required(),
      yearEnd: Joi.number().integer().min(1970).max(2100).required(),
      leagueName: Joi.string().min(1).max(50).required()
    })
  }
});

module.exports = {
  Season: Season,
  SeasonMatches: SeasonMatches
};
