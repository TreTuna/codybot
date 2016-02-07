'use strict';

var words = require('./composeWords.json');

module.exports = compose;

// Parts of speech, and which part of speech may follow
var options = {
  start: ['noun', 'verb'],
  noun: ['verb'],
  verb: ['noun']
};

// Returns a random element from an array
var randElem = function(array) {
  var index = Math.floor(Math.random() * array.length);
  return array[index];
};

// Composes a rhyming couplet of ten syllable lines
var composeCouplet = function() {
  var rhyme;

  var writeLine = function() {
    var syllables = 0;
    var type = 'start';
    var line = '';
    var word;

    var addWord = function() {
      type = randElem( options[type] );
      word = randElem( words[type] );
      line += word.word + ' ';
      syllables += word.syll;
    };

    while (syllables < 10) {
      addWord();
    }

    if (rhyme) {
      word = randElem( words[type] );

      // If it can't find a rhyme, it will bail after 100 tries
      while (word.rhyme !== rhyme && syllables < 100) {
        word = randElem( words[type] );
        syllables++;
      }
      line += word.word;

    } else {
      addWord();
    }
    rhyme = word.rhyme;

    // Formatting
    line = line[0].toUpperCase() + line.slice(1);
    line = line.trim();
    line += randElem( words.punctuation );

    return line;
  };

  return writeLine() + '\n' + writeLine();
};

function compose(slack, args, message) {
  var channel = slack.getChannelGroupOrDMByID(message.channel);

  channel.send(composeCouplet());
}