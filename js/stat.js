'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;

var HIST_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var HIST_GAP = 40;

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomSaturation = function (hue, lightness) {
  return 'hsl(' + hue + ', ' + getRandomInt(0, 100) + '%, ' + lightness + '%)';
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var renderHistogramBar = function (names, times, maxTime, ctx) {
  for (var i = 0; i < names.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = getRandomSaturation(240, 50);
    }

    ctx.fillRect(
        CLOUD_X + HIST_GAP + (BAR_GAP + BAR_WIDTH) * i,
        CLOUD_Y + CLOUD_HEIGHT - HIST_GAP,
        BAR_WIDTH,
        -(HIST_HEIGHT * times[i]) / maxTime
    );
  }
};

var renderHistogram = function (names, times, ctx) {
  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillText(
        names[i],
        CLOUD_X + HIST_GAP + (BAR_GAP + BAR_WIDTH) * i,
        CLOUD_Y + CLOUD_HEIGHT - HIST_GAP + FONT_GAP * 1.5
    );

    ctx.fillText(
        Math.floor(times[i]),
        CLOUD_X + HIST_GAP + (BAR_GAP + BAR_WIDTH) * i,
        CLOUD_Y + CLOUD_HEIGHT - HIST_GAP - (HIST_HEIGHT * times[i]) / maxTime - FONT_GAP
    );
  }

  renderHistogramBar(names, times, maxTime, ctx);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(
      ctx,
      CLOUD_X + GAP,
      CLOUD_Y + GAP,
      'rgba(0, 0, 0, 0.7)'
  );
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      '#fff'
  );

  ctx.fillStyle = '#000';

  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + 20, CLOUD_Y + 20);
  ctx.fillText('Список результатов:', CLOUD_X + 20, CLOUD_Y + 40);

  renderHistogram(names, times, ctx);

};
