const db = require('../config/db.config');
const config = require('../config/config');
const User = db.user;
const Contact = db.contact;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
	// Save User to Database
	console.log("Processing func -> SignUp");
	console.log(req.body);
	User.create({
		name: req.body.name,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8),
		dob: req.body.dob,
		gender: req.body.gender
	}).then(user => {
		var token = jwt.sign({ id: user.id }, config.secret, {
			expiresIn: 3600 // expires in 1 hours
		});
		res.json({ auth: true, accessToken: token, reason: "",username:user.name });
	}).catch(err => {
		res.json({ "error": "Fail! Error -> " + err });
	})
}

exports.signin = (req, res) => {
	console.log("Sign-In");
	User.findOne({
		where: {
			email: req.body.email
		}
	}).then(user => {
		if (!user) {
			return res.json({ auth: false, accessToken: null, reason: "User Not Found." });
		}

		var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if (!passwordIsValid) {
			return res.json({ auth: false, accessToken: null, reason: "Invalid Password!" });
		}

		var token = jwt.sign({ id: user.id }, config.secret, {
			expiresIn: 3600 // expires in 1 hours
		});

		res.json({ auth: true, accessToken: token, reason: "" ,username:user.name});

	}).catch(err => {
		res.json({ "error": 'Error -> ' + err });
	});
}

exports.createContact = (req, res) => {
	// Save Contact to Database
	console.log(req.body);
	Contact.create({
		name: req.body.name,
		email: req.body.email,
		subject: req.body.subject,
		message: req.body.message,
		query: req.body.query
	}).then(contact => {
		res.json({ "success": "Contact Information is successfully created!" });
	}).catch(err => {
		res.json({ "error": "Fail! Error -> " + err });
	})
}

exports.contactList = (req, res) => {
	Contact.findAll({
	}).then(contacts => {
		res.json({success:"success!",data:contacts});
	}).catch(err => {
		res.json({ "error": "Fail! Error -> " + err });
	})
}

