const Comment = require('mongoose').model('Comment');
const errorHandler = require('../utils/error-handler');

module.exports = {
	postComment(request, response){
		Comment.create(request.body)
			.then(newComment => Comment.populate(newComment, {
				path: 'commentFrom',
				model: 'User',
				select: 'username'
			}))
			.then(newComment => response.json(newComment))
			.catch(errorHandler.bind(response));
	},
	deleteComment(request, response){
		Comment.findByIdAndRemove(request.params.id)
			.then(deletedComment => {
				return deletedComment.removeFromMessage();		
			})
			.then(newMessage => response.json(newMessage))
			.catch(console.log);
	},
	updateComment(req, res) {
		Comment.updateComment(req.params.id, req.body.text)
			.then(newMessage => res.json(newMessage))
			.catch(errorHandler.bind(res));
	}
}
