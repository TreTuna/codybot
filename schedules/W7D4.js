// 'use strict';

var c = require('../lib/channels.js');
var date = require('../lib/date.js');

var events = [];

events.push({
  when: date('W7D4', 09, 55),
  who: c.seniors,
  message: '<!channel> Sprint Reflection in 5 Minutes!'
});

events.push({
  when: date('W7D4', 09, 59),
  who: c.seniors,
  message: '<!channel> Sprint Reflection in 1 Minute!'
});

module.exports = events;