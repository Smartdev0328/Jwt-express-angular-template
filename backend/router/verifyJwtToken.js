const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
 
verifyToken = (req, res, next) => {
	let token = req.headers['authorization'];
	console.log(token)
	if (!token){
		return res.json({ 
			auth: false, message: 'No token provided.' 
		});
	}
 
	jwt.verify(JSON.parse(token), config.secret, (err, decoded) => {
		if (err){
			console.log(err)
			console.log(decoded)
			return res.json({ 
					auth: false, 
					message: 'Fail to Authentication. Error -> ' + err 
				});
		}
		req.userId = decoded.id;
		next();
	});
}
const authJwt = {};
authJwt.verifyToken = verifyToken;
 
module.exports = authJwt;