const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
	text: {
		type: String,
		required: [true, 'Comment text is required'],
		trim: true
	},
	commentOn: {
		type: Schema.Types.ObjectId,
		ref: 'Message'
	},
	commentFrom: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	edited: {
		type: Boolean,
		default: false
	}
}, {
	timestamps: true
});

commentSchema.methods.removeFromMessage = function(){
	return this.model('Message').findById(this.commentOn)
		.then(message => {
			message.comments.splice(message.comments.findIndex(_id => {
				return _id.toString() === this._id.toString();
			}), 1);
			return message.save();
		})
		.then(message => message.populateMessage());
}

module.exports = mongoose.model('Comment', commentSchema);
