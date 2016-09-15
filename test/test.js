const test = require('tape')
const tc = require('../')

test('is wired up', function (t) {
  t.plan(1)
  t.ok(true)
})


test('simple highlight term when text has line breaks', function (t) {
  t.plan(3)
  const highlight = function(match, offset, string) {
    return chalk.red(match)
  }
  const text = 
    'Three Rings for the Elven-kings under the sky,\n' + 
    'Seven for the Dwarf-lords in halls of stone,\n' +
    'Nine for Mortal Men, doomed to die,\n' +
    'One for the Dark Lord on his dark throne\n' +
    'In the Land of Mordor where the Shadows lie.\n' +
    'One Ring to rule them all, One Ring to find them,\n' +
    'One Ring to bring them all and in the darkness bind them.\n' +
    'In the Land of Mordor where the Shadows lie.\n'

  t.equals(tc(text, ['ring']), 'One\x1b[31m Ring \x1b[39mto rule them all, One\x1b[31m Ring \x1b[39mto find them, ... One\x1b[31m Ring \x1b[39mto bring them all and in the darkness bind them.')

  t.equals(tc(text, ['ring', 'mordor']), 'In the Land of\x1b[31m Mordor \x1b[39mwhere the Shadows lie. ... One\x1b[31m Ring \x1b[39mto rule them all, One\x1b[31m Ring \x1b[39mto find them, ... One\x1b[31m Ring \x1b[39mto bring them all and in the darkness bind them. ... In the Land of\x1b[31m Mordor \x1b[39mwhere the Shadows lie.')

  t.equals(tc(text, ['ring', 'mordor'], function(term) {
    return 'XXX' + term.toUpperCase() + 'XXX'
  }), 'In the Land ofXXX MORDOR XXXwhere the Shadows lie. ... OneXXX RING XXXto rule them all, OneXXX RING XXXto find them, ... OneXXX RING XXXto bring them all and in the darkness bind them. ... In the Land ofXXX MORDOR XXXwhere the Shadows lie.')

})


test('simple highlight term when text DOES NOT have line breaks', function (t) {
  t.plan(3)
  const highlight = function(match, offset, string) {
    return chalk.red(match)
  }
  const text = 
    'Three Rings for the Elven-kings under the sky, Seven for the Dwarf-lords in halls of stone, Nine for Mortal Men, doomed to die, One for the Dark Lord on his dark throne. In the Land of Mordor where the Shadows lie. One Ring to rule them all, One Ring to find them, One Ring to bring them all and in the darkness bind them. In the Land of Mordor where the Shadows lie.'

  t.equals(tc(text, ['ring']), 'ark throne. In the Land of Mordor where the Shadows lie. One\x1b[31m Ring \x1b[39mto rule them all, One\x1b[31m Ring \x1b[39mto find them, One\x1b[31m Ring \x1b[39mto bring t')

  t.equals(tc(text, ['ring', 'mordor']), 'ie, One for the Dark Lord on his dark throne. In the Land of\x1b[31m Mordor \x1b[39mwhere the Shadows lie. One\x1b[31m Ring \x1b[39mto rule them all, One\x1b[31m Ring \x1b[39mt ... o find them, One\x1b[31m Ring \x1b[39mto bring them all and in the darkness bind them. In the Land ... of\x1b[31m Mordor \x1b[39mwhere the Shadows lie.')

  t.equals(tc(text, ['ring', 'mordor'], function(term) {
    return 'XXX' + term.toUpperCase() + 'XXX'
  }), 'ie, One for the Dark Lord on his dark throne. In the Land ofXXX MORDOR XXXwhere the Shadows lie. OneXXX RING XXXto rule them all, OneXXX RING XXXt ... o find them, OneXXX RING XXXto bring them all and in the darkness bind them. In the Land ... ofXXX MORDOR XXXwhere the Shadows lie.')

})


