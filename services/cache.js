/* eslint-disable new-cap */
/* eslint-disable func-names */
const { createClient } = require('redis');
const mongoose = require('mongoose');
const util = require('util');

const client = createClient('redis://127.0.0.1:6379');
client.get = util.promisify(client.get);
const { exec } = mongoose.Query.prototype;

mongoose.Query.prototype.exec = async function (...args) {
  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    }),
  );
  const cacheValue = await client.get(key);
  // check if have cachedValue return
  if (cacheValue) {
    const doc = JSON.parse(cacheValue);
    return Array.isArray(cacheValue)
      ? doc.map(d => new this.model(d))
      : new this.model(doc);
  }
  // set data in redis
  const result = await exec.apply(this, args);
  client.set(key, JSON.stringify(result));
  // if not issue query
  await client.flushall()
  return result;
};
