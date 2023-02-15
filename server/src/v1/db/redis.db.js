import redis from 'redis';

const REDIS_URL = process.env.REDIS_URL || 'redis';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient({
  url: `redis://${REDIS_URL}:${REDIS_PORT}`
});

client.on("error", function (err) {
  console.log("redis: Error " + err);
});

client.on("connect", function (err) {
  console.log("redis: Connected ");
});

client.on("ready", function (err) {
  console.log("redis: Ready ");
});

client.ping((err, pong) => {
  console.log(pong);
});

export default client;