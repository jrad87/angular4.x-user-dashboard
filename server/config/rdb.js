// TODO add this later when running on a linux vm
// The redis db will contain the queue for tracking
// signed in users and timing them out
const redis = require('redis');
const client = redis.createClient();

console.log('Runnin redis config');

client.on('ready', () => console.log('Redis server connected'));
client.subscribe('chat');
client.on('message', (channel, message) => console.log(message));
module.exports = client;
