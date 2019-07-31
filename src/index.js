"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/**
 * @author karakulov.web.dev@gmail.com
 */
var mongo_db_facade_1 = require("@karakulov-web-dev/mongo-db-facade");
var ProfilesApi_1 = __importDefault(require("./ProfilesApi"));
var builderDb = new mongo_db_facade_1.MongoDbBuilder({
    bdName: "votingPay",
    user: "votingPay",
    password: "NoSQLBoosterMongoDBPassword123",
    authMechanism: "DEFAULT",
    ip: "45.76.94.35",
    port: "27017"
});
var profiles = new mongo_db_facade_1.MongoDbFacade(builderDb.db, "vpProfiles");
new ProfilesApi_1["default"](8003, profiles);
