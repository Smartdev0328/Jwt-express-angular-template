const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');

module.exports = function(app) {
 
    const controller = require('../contoller/controller');
	app.post('/api/auth/signup', [verifySignUp.checkDuplicateEmail], controller.signup);
	
	app.post('/api/auth/signin', controller.signin);
	app.post('/api/contact', [authJwt.verifyToken], controller.createContact);
	app.get('/api/contact-list', [authJwt.verifyToken], controller.contactList);
	//app.get('/contact', [authJwt.verifyToken], controller.createContact);

}