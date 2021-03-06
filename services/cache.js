/* eslint-disable new-cap */
/* eslint-disable func-names */
const { createClient } = require('redis');
const mongoose = require('mongoose');
const util = require('util');
const config = require('config')

const client = createClient(config.get('redisUrl'));
client.hget = util.promisify(client.hget);
const { exec } = mongoose.Query.prototype;

// should cached?
mongoose.Query.prototype.cache = function (options = {}) {
  this.hashKey = JSON.stringify(options.key || '');
  this.shouldCache = true;
  return this;
};
mongoose.Query.prototype.exec = async function (...args) {
  const result = await exec.apply(this, args);
  // should cached?
  if (!this.shouldCache) return result;
  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    }),
  );
  const cacheValue = await client.hget(this.hashKey, key);
  // check if have cachedValue return
  if (cacheValue) {
    const doc = JSON.parse(cacheValue);

    return Array.isArray(doc)
      ? doc.map(d => new this.model(d))
      : new this.model(doc);
  }
  // set data in redis
  client.hset(this.hashKey, key, JSON.stringify(result));
  // if not issue query
  return result;
};

exports.clearHash = async function (hashKey) {
  client.del(JSON.stringify(hashKey));
};
