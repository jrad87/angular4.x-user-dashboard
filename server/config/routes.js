const path = require('path');
const auth = require('../controllers/auth');
const users = require('../controllers/users');
const messages = require('../controllers/messages');
const comments = require('../controllers/comments');
const profiles = require('../controllers/profiles');
const friends = require('../controllers/friends');

//const redis = require('redis');
//const pub = redis.createClient();
//pub.publish('chat', 'first message');

module.exports = function(app){
	app .post('/api/auth/login', auth.login)
		.post('/api/auth/register', auth.register)
		.delete('/api/auth/logout', auth.logout)
		
		.get('/api/users', users.index)
		.get('/api/users/:id', users.show)
		.put('/api/users/messages/:u_id', users.sendMessage)
		
		.post('/api/users/:id/friend', friends.requestFriend)
		.post('/api/friends/:id', friends.acceptRequest)
		.delete('/api/friends/reject/:id', friends.rejectRequest)
		.delete('/api/friends/cancel/:id', friends.cancelRequest)
		.put('/api/friends/unfriend', friends.unfriend)

		.post('/api/messages/:user_id', messages.postMessage)
		.delete('/api/messages/:id', messages.deleteMessage)
		.put('/api/messages/:id/comments', messages.addComment)
		.put('/api/messages/:id', messages.updateMessage)

		.post('/api/comments/:m_id', comments.postComment)
		.delete('/api/comments/:id', comments.deleteComment)
		.put('/api/comments/:id', comments.updateComment)
			
		.get('/api/profiles/:id', profiles.showUserProfile)

		.all('*', (request, response) => {
			response.sendFile(path.join(__dirname, '../../dist/index.html'))	
		});
}
