/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import { createClient, SetOptions } from 'redis';
import config from '../config';

//! step-1
const redisClient = createClient({
  url: config.redis.url,
});
const redisPubClient = createClient({
  url: config.redis.url,
});
const redisSubClient = createClient({
  url: config.redis.url,
});

//! step-2
redisClient.on('error', error => console.log('Redis Error', error));
redisClient.on('connect', error => console.log('Redis connected'));

//! step-3
const connect = async (): Promise<void> => {
  await redisClient.connect();
  await redisPubClient.connect();
  await redisSubClient.connect();
};

// ! step-4

const set = async (
  key: string,
  value: string,
  options?: SetOptions
): Promise<void> => {
  await redisClient.set(key, value, options);
};

const get = async (key: string): Promise<string | null> => {
  return await redisClient.get(key);
};

const del = async (key: string): Promise<void> => {
  await redisClient.del(key);
};

const setAccessToken = async (userId: string, token: string): Promise<void> => {
  const key = `access-token:${token}`;

  await redisClient.set(key, token, { EX: Number(config.redis.expires_in) });
};

const getAccessToken = async (userId: string): Promise<string | null> => {
    const key =`access-token: ${userId}`
    return await redisClient.get(key)
};

const delAccessToken = async(userId:string):Promise<void>=>{
    const key =`access-token:${userId}`
    await redisClient.del(key)
}

// for disconnect redis server ///
const disconnect = async (): Promise<void> => {
  await redisClient.quit();
  await redisPubClient.quit();
  await redisSubClient.quit();
};

//! step-4

export const RedisClient = {
  connect,
  set,
  get,
  del,
  setAccessToken,
  getAccessToken,
  delAccessToken,
  disconnect,

  publish: redisPubClient.publish.bind(redisPubClient),
  subscribe: redisSubClient.publish.bind(redisSubClient),
};
