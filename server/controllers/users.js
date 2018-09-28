const User = require('mongoose').model('User');
const errorHandler = require('../utils/error-handler');

module.exports = {
	index(request, response){
		User.index()
			.then(users => response.json(users))
			.catch(console.log);
	},
	show(request, response){
		User.show(request.params.id)
			.then(user => response.json(user))			
			.catch(console.log);
	},
	sendMessage(request, response){
		User.findById(request.params.u_id)
			.select('-password')
			.then(user => {
				user.messages.push(request.body);
				return user.save()
			})
			.then(user => response.json(request.body))
			.catch(console.log);
	},
	blockUser(req, res) {
		User.findById(req.body.loggedInUserId)
			.then(user => user.blockOtherUser(req.params.id))
			.then(() => User.index())
			.then(users => res.json(users))
			.catch(console.log)
	},
	unblockUser(req, res) {
		User.findById(req.body.loggedInUserId)
			.then(currentUser => currentUser.unblockUser(req.params.id))
			.then(blockedUsers => res.json(blockedUsers))
			.catch(console.log)
	},
	getBlockedList(req, res) {
		User.getBlockedList(req.params.id)
			.then(blockedList => res.json(blockedList))
			.catch(console.log);
	},
	getBlockerList(req, res) {
		User.getBlockerList(req.params.id)
			.then(blockerList => res.json(blockerList))
			.catch(console.log)
	}
}
