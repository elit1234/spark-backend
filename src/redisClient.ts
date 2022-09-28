import { createClient } from 'redis';





const client = createClient({
    socket: {
        host: process.env.REDIS_IP,
        port: Number(process.env.REDIS_PORT)
    },
    password: process.env.REDIS_PASS
});

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect();

export default client;