'use strict';

var path = require('path'),
 _ = require('lodash');

// Load app configuration
var all = require(__dirname + '/../config/env/all.js'),
    env = require(__dirname + '/../config/env/' + process.env.NODE_ENV + '.js');
    env.distFolder = path.resolve(all.root, env.distFolder);  
module.exports = _.extend(all,env || {});