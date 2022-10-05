import { createClient } from 'redis';





const client = createClient({
    socket: {
        host: "192.168.1.148",
        port: 6379
    },
    password: process.env.REDIS_PASS
});

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect();

export default client;