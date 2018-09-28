const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;


const userSchema = new Schema({
	firstName: {
		type: String,
		required: [true, 'First name is required'],
		minlength: [2, 'First name must be at least 2 characters'],
		trim: true
	},
	lastName: {
		type: String,
		required: [true, 'Last name is required'],
		minlength: [2, 'Last name must be at least 2 characters'],
		trim: true
	},
	username: {
		type: String,
		required: [true, 'Username is required'],
		minlength: [8, 'Username must be at least 8 characters'],
		unique: true
	},
	isActive:{
		type: Boolean
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		minlength: [8, 'Password must be at least 8 characters']
	},
	messages: [{
		type: Schema.Types.ObjectId,
		ref: 'Message'
	}],
	friends: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}],
	friendRequests: [{
		type: Schema.Types.ObjectId,
		ref: 'FriendRequest'
	}],
	blockedBy: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}],
	blocked: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}],
	profile: {
		type: Schema.Types.ObjectId,
		ref: 'UserProfile'
	}
}, {
	timestamps: true
});

userSchema.pre('save', function(next){
	if(!this.isModified('password')) return next();
	bcrypt.genSalt(10, (error, salt) => {
		if (error) return next(error);
		bcrypt.hash(this.password, salt, (error, hashedPW) => {
			if(error) return next(error);
			this.password = hashedPW;
			next();
		});
	});
});

userSchema.statics.index = function() {
	return this.model('User')
		.find({})
		.select('-password')
		.populate('friendRequests')
		
}

userSchema.statics.show = function(id) {
	return this.model('User')
		.findById(id)
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
}

userSchema.methods.createProfile = function(){
	return this.model('UserProfile').create({})
		.then(newProfile => {
			this.profile = newProfile;
			return this.save();
		})
}

userSchema.methods.activateStatus = function(){
	return this.model('User').findById(this._id)
		.then(user => {
			user.isActive = true;
			return user.save();
		})
}

userSchema.methods.deactivateStatus = function(){
	return this.model('User').findById(this._id)
		.then(user => {
			user.isActive = false;
			return user.save();
		});
}

userSchema.methods.clearProfileAfterDelete = function(){
	return this.model('UserProfile').findByIdAndRemove(this.profile);
}

userSchema.statics.getBlockerList = function(id) {
	return this.model('User').findById(id)
		.select('blockedBy')
		.then(user => user.blockedBy)
}

userSchema.statics.getBlockedList = function(id) {
	return this.model('User').findById(id)
		.select('blocked')
		.populate({
			path : 'blocked',
			model: 'User',
			select: 'firstName lastName username'
		})
}

userSchema.methods.blockOtherUser = function(otherUserId) {
	console.log(this);
	return this.model('FriendRequest').unfriend(this._id, otherUserId)
		.then(() => this.model('User').findById(this._id))
		.then(blocker => {
			blocker.blocked.push(otherUserId);
			return blocker.save()
		})
		.then(() => this.model('User').findById(otherUserId))
		.then(blocked => {
			blocked.blockedBy.push(this._id)
			return blocked.save()
		})
}

userSchema.methods.unblockUser = function(otherUserId) {
	return this.model('User').findById(otherUserId)
		.then(user => {
			let index = user.blockedBy.findIndex(id => id.toString() === this._id.toString())
			if(index >= 0) user.blockedBy.splice(index, 1)
			return user.save()
		})
		.then(() => {
			let index = this.blocked.findIndex(id => id.toString() === otherUserId.toString())
			if(index >= 0) this.blocked.splice(index, 1);
			console.log(this.blocked)
			return this.save()
		})
		.then(() => this.model('User').getBlockedList(this._id))
}

userSchema.statics.verifyPassword = function(candidatePW, hashedPW){
	return new Promise( (resolve, reject) => {
		bcrypt.compare(candidatePW, hashedPW, (error, success) => {
			if(candidatePW === undefined) reject(new Error ('Password is required'));
			if (error) reject(error);
			success ? resolve(success) : reject( new Error('Invalid credentials'));
		});
	});
}

module.exports = mongoose.model('User', userSchema);
