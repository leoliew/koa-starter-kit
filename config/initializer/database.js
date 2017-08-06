"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as config from 'config'
// import logger from '../../app/lib/Logger'
var mongoose = require("mongoose");
// const mongoConfigs = config.get('database.mongodb')
// const DEBUG_FLAG = config.get('database.mongoDebug')
// mongoose.set('Promise', require('bluebird'))
// mongoose.Promise = require('bluebird')
mongoose.set('debug', true);
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
// for (let c of mongoConfigs) {
dbs.set('db', createConnection('mongodb://127.0.0.1:27017/beta_koa', {}));
// }
exports.default = dbs;
