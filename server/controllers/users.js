const User = require('mongoose').model('User');
const errorHandler = require('../utils/error-handler');

module.exports = {
	index(request, response){
		User.find({})
			.select('-password')
			.populate('friendRequests')
			.then(users => response.json(users))
			.catch(console.log);
	},
	show(request, response){
		User.findById(request.params.id)
			.select('-password')
			.populate({
				path: 'messages',
				model: 'Message',
				populate: {
					path: 'messageFrom',
					model: 'User',
					select: 'username'
				}
			})
			.populate({
				path: 'messages',
				populate: {
					path: 'comments',
					model: 'Comment',
					populate: {
						path: 'commentFrom',
						model: 'User',
						select: 'username'
					}
				}
			})
			.populate('friendRequests')
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
			.then(user => {
				console.log(request.body);
				console.log(user);
				response.json(request.body);
			})
			.catch(console.log);
	},
}
