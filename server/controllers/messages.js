const Message = require('mongoose').model('Message');
const errorHandler = require('../utils/error-handler');

module.exports = {
	postMessage(request, response){
		Message.create(request.body)
			.then(newMessage => {
				return Message.populate(newMessage, {
					path: 'messageFrom', 
					model: 'User',
					select: 'username'
				});
			})
			.then(newMessage => {
				return Message.populate(newMessage, {
					path: 'comments',
					model: 'Comment',
					populate: {
						path: 'commentFrom',
						model: 'User',
						select: 'username'
					}
				});
			})
			.then(newMessage => {
				response.json(newMessage);
			})
			.catch(errorHandler.bind(response));
	},
	deleteMessage(request, response){
		Message.findByIdAndRemove(request.params.id)
			.then(deletedMessage => deletedMessage.cleanupAfterDelete())
			.then(deletedMessage => response.json(deletedMessage))
			.catch(console.log)
	},
	updateMessage(request, response){
		Message.findById(request.params.id)
			.then(message => message.updateMessage(request.body.text))
			.then(updatedMessage => response.json(updatedMessage))
			.catch(errorHandler.bind(response));
	},
	addComment(request, response){
		Message.findById(request.params.id)
			.then(message => {
				message.comments.push(request.body.id)
				return message.save();
			})
			.then(message => Message.populate(message,[{
				path: 'messageFrom',
				model: 'User',
				select: 'username'
			}, {
				path: 'comments',
				model: 'Comment',
				populate: {
					path: 'commentFrom',
					model: 'User',
					select: 'username'
				}
			}]))
			.then(message => {
				response.json(message)
			})
			.catch(console.log);
	}
}
