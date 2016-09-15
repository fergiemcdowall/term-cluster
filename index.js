const chalk = require('chalk')

const highlight = function(match, offset, string) {
  return chalk.red(match)
}

module.exports = function(text, terms, hi) {
  var teaser = text.toString()
    .match(new RegExp('(.{0,60})[- ,]+(' + terms.join('|')  + ')[ \\.,]+(.{0,60})', 'ig'), hi || highlight)
  if (teaser) teaser = teaser.map(function(item) {
    return item.trim()
  })
  if (teaser) teaser = teaser.join(' ... ')
    .replace(new RegExp('[- ,]+(' + terms.join('|') + ')[ \\.,]+', 'ig'), hi || highlight)

  return teaser
}
