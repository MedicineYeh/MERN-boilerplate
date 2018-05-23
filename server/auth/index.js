const path = require('path');
const requireDir = require('require-dir');

const routes = require('./routes');
const passport = require('./passport');
const permission = require('./permission');

module.exports = {routes, passport, permission};
