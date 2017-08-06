"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
mongoose.set('debug', true);
let dbs = new Map();
function createConnection(url, options = {}) {
    const db = mongoose.createConnection(url, options);
    db.on('error', err => {
        err.message = `[mongoose]${err.message}`;
        // logger.error(err)
        console.log(err);
    });
    db.on('disconnected', () => {
        console.log(`[mongoose] ${url} disconnected`);
        // logger.error(`[mongoose] ${url} disconnected`)
    });
    db.on('connected', () => {
        console.log(`[mongoose] ${url} connected successfully`);
        // logger.info(`[mongoose] ${url} connected successfully`)
    });
    db.on('reconnected', () => {
        console.log(`[mongoose] ${url} reconnected successfully`);
        // logger.info(`[mongoose] ${url} reconnected successfully`)
    });
    return db;
}
// for (let c of mongoConfigs) {
dbs.set('db', createConnection('mongodb://127.0.0.1:27017/beta_koa', {}));
// }
exports.default = dbs;
//# sourceMappingURL=database.js.map