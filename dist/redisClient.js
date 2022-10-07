"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const client = (0, redis_1.createClient)({
    socket: {
        host: "192.168.1.148",
        port: 6379
    },
    password: "Kawasaki711123"
});
client.on('error', (err) => console.log('Redis Client Error', err));
client.connect();
exports.default = client;
