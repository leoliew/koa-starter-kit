"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var database_1 = require("../../../initializer/database");
var mongodb = database_1.default.get('mongodb');
var modelName = 'User';
var schema = new mongoose_1.Schema({
    phone: { type: String },
    name: { type: String },
    isRegister: { type: Boolean }
});
exports.User = mongodb.model(modelName, schema, modelName);
