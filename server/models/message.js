const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    text: {
	type: String,
	required: [true, 'Message text is required'],
	trim: true
    },
    messageTo: {
	type: Schema.Types.ObjectId,
	ref: 'User'
    },
    messageFrom: {
	type: Schema.Types.ObjectId,
	ref: 'User'
    },
    edited: {
	type: Boolean,
	default: false
    },
    comments: [{
	type: Schema.Types.ObjectId,
	ref: 'Comment'
    }]
}, {
    timestamps: true
});

messageSchema.methods.cleanupAfterDelete = function(){
    return this.model('User').findById(this.messageTo)
	.then(user => {
	    user.messages.splice(user.messages.findIndex( _id => {
		return _id === this._id;
	    }), 1);
	    return user.save()
		.then(() => this)
	})
	.then( () => Promise.all(this.comments.map( c_id => {
	    return this.model('Comment').findByIdAndRemove(c_id.toString());
	}))
	     )
	.then( () => this)
	.catch(console.log);
}

messageSchema.methods.populateMessage = function(){
    return this.model('Message').populate(this, [{
	path: 'comments',
	model: 'Comment',
	populate: {
	    path: 'commentFrom',
	    model: 'User',
	    select: 'username'
	}
    }]);
}

module.exports = mongoose.model('Message', messageSchema);
