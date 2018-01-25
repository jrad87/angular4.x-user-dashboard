const mongoose = require('mongoose');
const { Schema } = mongoose;

const timeoutQueueSchema = new Schema({
	users: [{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		loginTime: {
			type: Date
		}
	}]
}, {
	timestamps: true
});

timeoutQueueSchema.statics.Queue = function(){
	return this.findOne({})
		.then(queue => {
			if(!queue) return this.create({});
			return queue;
		})
		.then(queue => {
			return this.model('Timeouts').populate(queue, {
				path: 'users.user',
				model: 'User',
				select: 'username'
			})
		});
}

timeoutQueueSchema.methods.enqueue = function(user){
	this.users.push({
		user: user,
		loginTime: Date.now()
	});
	return this.save();
}

timeoutQueueSchema.methods.removeUserOnLogout = function(userId){
	this.users.splice(this.users.findIndex(item => {
		return item.user._id.toString() === userId.toString();
	}), 1);
	return this.save();
}

timeoutQueueSchema.methods._clearAll = function(){
	this.users = [];
	return this.save();
}

timeoutQueueSchema.methods.peek = function(){
	return this.users[0];
}

module.exports = mongoose.model('Timeouts', timeoutQueueSchema);
