'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _context = require('./context');

var _context2 = _interopRequireDefault(_context);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var quote = 'Published since September 1843 to take part in <br/><em>“a severe contest between intelligence, which presses forward,<br/>and an unworthy, timid ignorance obstructing our progress.”</em>';

exports['default'] = _react2['default'].createElement(_index2['default'], { data: _context2['default'], quote: quote });
module.exports = exports['default'];