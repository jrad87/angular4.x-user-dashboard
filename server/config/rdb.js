const redis = require('redis');
const client = redis.createClient();

console.log('Runnin redis config');

client.on('ready', () => console.log('Redis server connected'));
client.subscribe('chat');
client.on('message', (channel, message) => console.log(message));
module.exports = client;
