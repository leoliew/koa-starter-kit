"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var bluebird = require("bluebird");
var config = require("config");
var mongodbConfig = config.get('database.mongodb');
var DEBUG_FLAG = config.get('database.mongooseDebug');
mongoose.set('Promise', bluebird);
mongoose.set('debug', DEBUG_FLAG);
var dbs = new Map();
function createConnection(url, options) {
    if (options === void 0) { options = {}; }
    var db = mongoose.createConnection(url, options);
    db.on('error', function (err) {
        err.message = "[mongoose]" + err.message;
        // logger.error(err)
        console.log(err);
    });
    db.on('disconnected', function () {
        console.log("[mongoose] " + url + " disconnected");
        // logger.error(`[mongoose] ${url} disconnected`)
    });
    db.on('connected', function () {
        console.log("[mongoose] " + url + " connected successfully");
        // logger.info(`[mongoose] ${url} connected successfully`)
    });
    db.on('reconnected', function () {
        console.log("[mongoose] " + url + " reconnected successfully");
        // logger.info(`[mongoose] ${url} reconnected successfully`)
    });
    return db;
}
for (var _i = 0, mongodbConfig_1 = mongodbConfig; _i < mongodbConfig_1.length; _i++) {
    var c = mongodbConfig_1[_i];
    dbs.set(c.name, createConnection(c.url, c.options));
}
exports.default = dbs;
