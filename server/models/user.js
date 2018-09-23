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
