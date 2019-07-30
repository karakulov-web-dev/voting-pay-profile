/**
 * @author karakulov.web.dev@gmail.com
 */

import { FastExpress, express } from "@karakulov-web-dev/fast-express";

import mongodb from "mongodb";
const MongoClient = mongodb.MongoClient;

interface IMongoDbFacadeArg {
  bdName: string;
  user: string;
  password: string;
  authMechanism: string;
  ip: string;
  port: string;
}

class MongoDbFacade {
  private db: mongodb.Db | Promise<mongodb.Db>;
  private client: mongodb.MongoClient;
  private bdName: string;
  constructor({
    bdName,
    user,
    password,
    authMechanism,
    ip,
    port
  }: IMongoDbFacadeArg) {
    this.bdName = encodeURIComponent(bdName);
    user = encodeURIComponent(user);
    password = encodeURIComponent(password);
    const url = `mongodb://${user}:${password}@${ip}:${port}/?authMechanism=${authMechanism}`;
    this.client = new MongoClient(url, { useNewUrlParser: true });
    this.db = this.build();
  }
  private build(): Promise<mongodb.Db> {
    return new Promise((resolve, reject) => {
      this.client.connect(err => {
        if (err) {
          reject("error connection db");
          return;
        }
        resolve(this.client.db(this.bdName));
      });
    });
  }
}
