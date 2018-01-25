const FriendRequest = require('mongoose').model('FriendRequest');
const errorHandler = require('../utils/error-handler');

module.exports = {
	requestFriend(request, response){
		//console.log(request.body);
		FriendRequest.create({requester: request.body.requester, requestee: request.params.id})	
			.then(friendRequest => friendRequest.placeRequest())
			.then(friendRequest => response.json(friendRequest))
			.catch(console.log);
	},
	rejectRequest(request, response){
		FriendRequest.findById(request.params.id)
			.then(friendRequest => friendRequest.remove())
			.then(rejectedRequest => rejectedRequest.populatePostRemove())
			.then(rejectedRequest => response.json(rejectedRequest))
	},
	cancelRequest(request, response){
		FriendRequest.findById(request.params.id)
			.then(friendRequest => friendRequest.remove())
			.then(canceledRequest => canceledRequest.populatePostRemove())
			.then(canceledRequest => response.json(canceledRequest))
			.catch(console.log);
	},
	acceptRequest(request, response){
		FriendRequest.findById(request.params.id)
			.then(friendRequest => friendRequest.accept())
			.then(() => response.json({success: true}))
			.catch(console.log);
	}
}
