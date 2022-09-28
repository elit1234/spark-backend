"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const client = (0, redis_1.createClient)({
    socket: {
        host: process.env.REDIS_IP,
        port: Number(process.env.REDIS_PORT)
    },
    password: process.env.REDIS_PASS
});
client.on('error', (err) => console.log('Redis Client Error', err));
client.connect();
exports.default = client;
