/**
 * @author karakulov.web.dev@gmail.com
 */
import {
  MongoDbBuilder,
  MongoDbFacade
} from "@karakulov-web-dev/mongo-db-facade";
import ProfilesApi from "./ProfilesApi";

let builderDb = new MongoDbBuilder({
  bdName: "votingPay",
  user: "votingPay",
  password: "NoSQLBoosterMongoDBPassword123",
  authMechanism: "DEFAULT",
  ip: "45.76.94.35",
  port: "27017"
});
let profiles = new MongoDbFacade(builderDb.db, "vpProfiles");

new ProfilesApi(8003, profiles);
