"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rateLimiter;

var _rateLimiterFlexible = require("rate-limiter-flexible");

var _redis = _interopRequireDefault(require("redis"));

var _AppError = _interopRequireDefault(require("../../../errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const redisClient = _redis.default.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined
});

const limiter = new _rateLimiterFlexible.RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  // 5 requests
  duration: 5,
  // per 1 second by IP
  blockDuration: 30
});

async function rateLimiter(request, reponse, next) {
  try {
    await limiter.consume(request.ip);
    return next();
  } catch {
    throw new _AppError.default('To many requests, wait 5 minuts', 429);
  }
}