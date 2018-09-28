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

friendRequestSchema.statics.block = function(blockerId, blockeeId) {
	return this.model('User').unfriend(blockerId, blockeeId)
		.then(unfriendedUser => {
			unfriendedUser.blockedBy.push(blockerId)
			return unfriendedUser.save()
		})
}

friendRequestSchema.statics.unfriend = function(unfrienderId, unfriendeeId) {
	return this.model('User').findById(unfrienderId)
		.then(unfriender => {
			let index = unfriender.friends.findIndex(id => id.toString() === unfriendeeId.toString());
			if(index < 0) index = unfriender.friends.length + 1
			let friends = unfriender.friends.slice(0, index).concat(unfriender.friends.slice(index + 1))
			unfriender.friends = friends
			return unfriender.save()
		})
		.then(() => this.model('User').findById(unfriendeeId))
		.then(unfriendee => {
			let index = unfriendee.friends.findIndex(id => id.toString() === unfrienderId.toString());
			if(index < 0) index = unfriendee.friends.length + 1
			let friends = unfriendee.friends.slice(0, index).concat(unfriendee.friends.slice(index + 1))
			unfriendee.friends = friends
			return unfriendee.save()
		})
}

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
