"use strict";

var Backbone = require('backbone'),
  Joi = require('joi'),
  ScoreModel = require('./score'),
  TeamModel = require('./team'),
  LeagueModel = require('./league'),
  SeasonModel = require('./season').Season;

var Match = Backbone.Model.extend({
  defaults: {
    matchId: null,
    homeTeam: null,
    awayTeam: null,
    score: new ScoreModel(),
    league: null,
    date: null,
    season: null
  }
}, {
  getSchema: function () {
    return Joi.object().keys({
      matchId: Joi.string().required(),
      homeTeam: TeamModel.getSchema(),
      awayTeam: TeamModel.getSchema(),
      score: ScoreModel.getSchema(),
      league: LeagueModel.getSchema(),
      season: SeasonModel.getSchema(),
      date: Joi.number().integer().required()
    });
  }
});

module.exports = Match;
