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

var getRandomOpacity = function (red, green, blue) {
  return 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + Math.random() + ')';
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

window.renderStatistics = function (ctx, players, times) {
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

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillText(
        players[i],
        CLOUD_X + HIST_GAP + (BAR_GAP + BAR_WIDTH) * i,
        CLOUD_Y + CLOUD_HEIGHT - HIST_GAP + FONT_GAP * 1.5
    );

    ctx.fillText(
        Math.floor(times[i]),
        CLOUD_X + HIST_GAP + (BAR_GAP + BAR_WIDTH) * i,
        CLOUD_Y + CLOUD_HEIGHT - HIST_GAP - (HIST_HEIGHT * times[i]) / maxTime - FONT_GAP
    );
  }

  for (i = 0; i < players.length; i++) {
    if (i === 0) {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = getRandomOpacity(0, 0, 255);
    }

    ctx.fillRect(
        CLOUD_X + HIST_GAP + (BAR_GAP + BAR_WIDTH) * i,
        CLOUD_Y + CLOUD_HEIGHT - HIST_GAP,
        BAR_WIDTH,
        -(HIST_HEIGHT * times[i]) / maxTime
    );
  }
};
