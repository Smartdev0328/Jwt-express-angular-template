const db = require('../config/db.config.js');
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
	User.findOne({
		where: {
			email: req.body.email
		}
	}).then(user => {
		if (user) {
			res.json({ "error": "This email is already used!" });
			return;
		}
		next();
	});
}
const signUpVerify = {};
signUpVerify.checkDuplicateEmail = checkDuplicateEmail;
module.exports = signUpVerify;