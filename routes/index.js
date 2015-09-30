var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home', //frontend stuff
		failureRedirect: '/', //frontend stuff
		failureFlash : true
	}));

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home', //redirect to manage page (frontend)
		failureRedirect: '/signup', //redirect to signup page (frontend)
		failureFlash : true
	}));


	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	//delete account
	router.delete('/delete', function(req, res) {
		console.log(passport);
	});

	//manage page
	router.get('/manage', isAuthenticated, function(req, res) {
		res.send('manage')
	})

	return router;
}