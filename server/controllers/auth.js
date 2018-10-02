const User = require('mongoose').model('User');
const Timeouts = require('mongoose').model('Timeouts');
const errorHandler = require('../utils/error-handler');

module.exports = {
	login(request, response){
		User.findOne({username: request.body.username})
			.then(user => {
				if(!user) throw new Error('Invalid credentials')
				return User.verifyPassword(request.body.password, user.password)
					.then(() => user)		
			})
			.then(user => {
				if(user.isActive) throw new Error(
					'Please sign out of your other devices and try to log in again'
				);
				return user.activateStatus()
			})
			.then(user => login(request, response, user))
			.catch(errorHandler.bind(response));
	},
	register(req, res){
		User.findOne({username: req.body.username})
			.then(user => {
				if(user) throw new Error('User already exists, please login');
			})
			.then(() => {
				if( (req.body.password !== null) &&
					(req.body.confirmPW !== null) &&
					(req.body.password !== req.body.confirmPW) 
				) { throw new Error('Password must match confirmation') }
			})
			.then(() => {
				req.body.isActive = true;
				return User.create(req.body)
			})
			.then(newUser => newUser.createProfile())
			.then(newUser => login(req, res, newUser))
			.catch(errorHandler.bind(res));
	},
	logout(request, response){
		User.findByIdAndUpdate(request.session.user._id, {$set: {isActive: false}}, {new: true})
			.then(() => Timeouts.Queue())
			.then(queue => queue.removeUserOnLogout(request.session.user._id))
			.then(() => {
				//console.log(request.user);
				request.session.destroy();
				response.clearCookie('userID');
				response.clearCookie('expiration');
				response.json(true);
			})
			.catch(console.log);
	}
}
function login(request, response, user){
	return Timeouts.Queue()
		.then(userQueue => userQueue.enqueue(user._id))
		.then( () => {
			request.session.user = user.toObject();
			delete request.session.user.password;
			response.cookie('userID', user._id.toString());
			response.cookie('expiration', Date.now() + 86400 * 1000);
			response.json(request.session.user);
		})
		.catch(console.log);
}
