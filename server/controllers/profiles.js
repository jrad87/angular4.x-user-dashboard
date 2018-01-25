const UserProfile = require('mongoose').model('UserProfile');

module.exports = {
	showUserProfile(request, response){
		UserProfile.findById(request.params.id)
			.then(profile => response.json(profile))
			.catch(console.log);
	}
}
