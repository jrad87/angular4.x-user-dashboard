const mongoose = require('mongoose');
const { Schema } = mongoose;

const defaultImgPath = 'assets/img/default.jpeg';

const userProfileSchema = new Schema({
	profilePicture: {
		type: String,
		default: defaultImgPath
	},
	bannerImage: {
		type: String
	},
	interests: {
		isSet: {
			type: Boolean,
			default: false
		},	
		data: [{
			type: String
		}]
	},
	favoriteMovies: {
		isSet: {
			type: Boolean,
			default: false
		},
		data: [{
			type: String
		}],
	},
}, {
	timestamps: true
})

module.exports = mongoose.model('UserProfile', userProfileSchema);
