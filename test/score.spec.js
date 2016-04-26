"use strict";

var ScoreModel = require('../src/score');
var ResultEnum = require('../src/result');
var assert = require('assert');

describe('Score Model', function () {
  describe('#constructor', function () {
    it('should return a goal-less draw by default', function () {
      var draw = new ScoreModel();
      assert(draw.get('home') === 0);
      assert(draw.get('away') === 0);
      assert(draw.get('result') === ResultEnum.Draw);
    });
  });

  describe('#initialize', function () {
    it('should set the correct result even if not specified', function () {
      var homeWin = new ScoreModel({home: 5, away: 0});
      assert(homeWin.get('result') === ResultEnum.Home);
    });
  });

  describe('#validate', function () {
    it('should validate default scores', function () {
      var draw = new ScoreModel();
      assert(draw.isValid());
    });

    it('should validate against negative home goals', function () {
      var bad = new ScoreModel({home: -2});
      assert(!bad.isValid());
    });

    it('should validate against negative away goals', function () {
      var bad = new ScoreModel({away: -2});
      assert(!bad.isValid());
    });

    it('should validate against invalid results', function () {
      var bad = new ScoreModel({result: -2});
      assert(!bad.isValid());

      bad = new ScoreModel({result: 3});
      assert(!bad.isValid());
    });

    it('should validate against missing fields', function () {
      var draw = new ScoreModel();
      draw.unset('home');
      assert(!draw.isValid());

      draw = new ScoreModel();
      draw.unset('away');
      assert(!draw.isValid());

      draw = new ScoreModel();
      draw.unset('result');
      assert(!draw.isValid());
    });
  });

  describe('#set', function () {
    it('should set the result field after home or away fields are changed', function () {
      var draw = new ScoreModel();
      draw.set({home: 3});

      assert(draw.get('home') === 3);
      assert(draw.get('away') === 0);
      assert(draw.get('result') === ResultEnum.Home);

      draw.set({away: 3});
      assert(draw.get('home') === 3);
      assert(draw.get('away') === 3);
      assert(draw.get('result') === ResultEnum.Draw);

      draw.set({away: 4});
      assert(draw.get('home') === 3);
      assert(draw.get('away') === 4);
      assert(draw.get('result') === ResultEnum.Away);
    });
  });
});
