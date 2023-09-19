import { createClient } from 'redis';
import config from '../config';

const redisClient = createClient({
  url: config.redis.url,
});
const redisPubClient = createClient({
  url: config.redis.url,
});
const redisSubClient = createClient({
  url: config.redis.url,
});

const connect = async (): Promise<void> => {
  await redisClient.connect();
  await redisPubClient.connect();
  await redisSubClient.connect();
};

export const RedisClient ={
  connect,
  publish:redisPubClient.publish.bind(redisPubClient),
  subscribe:redisSubClient.publish.bind(redisSubClient)
}
