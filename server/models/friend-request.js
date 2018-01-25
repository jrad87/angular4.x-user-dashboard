const mongoose = require('mongoose');
const { Schema } = mongoose;

const friendRequestSchema = new Schema({
	requester: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	requestee: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
}, {
	timestamps: true
});

friendRequestSchema.methods.placeRequest = function(){
	return this.model('User').findById(this.requester)
		.then(user => {
			user.friendRequests.push(this);
			return user.save();
		})
		.then( () => {
			return this.model('User').findById(this.requestee)
		})
		.then(user => {
			user.friendRequests.push(this);
			return user.save();
		})
		.then( () => this);
}

friendRequestSchema.methods.accept = function(){
	return this.model('User').findById(this.requester)
		.then(requester => {
			requester.friends.push(this.requestee);
			return requester.save();
		})
		.then( () => {
			return this.model('User').findById(this.requestee);
		})
		.then(requestee => {
			requestee.friends.push(this.requester);
			return requestee.save();
		})
		.then( () => this.remove());
}

friendRequestSchema.methods.populatePostRemove = function(){
	return this.model('FriendRequest')
		.populate(this, [{
			path: 'requester',
			model: 'User',
			select: '-password',
			populate: {
				path: 'friendRequests',
				model: 'FriendRequest'
			}
		}, {
			path: 'requestee',
			model: 'User',
			select: '-password',
			populate: {
				path: 'friendRequests',
				model: 'FriendRequest'
			}
		}])
}

friendRequestSchema.pre('remove', function(next){
	Promise.all([this.requester, this.requestee].map(userId => {
		return this.model('User').findById(userId)
			.then(user => {
				let removeAt = user.friendRequests.findIndex(friendRequest => {
					return friendRequest.toString() === this._id.toString();
				});
				if (removeAt >= 0){
					user.friendRequests.splice(removeAt, 1);
				}
				return user.save()
			})
	}))
	.then( () => next());
})

module.exports = mongoose.model('FriendRequest', friendRequestSchema);
