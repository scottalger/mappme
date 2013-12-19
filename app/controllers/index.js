/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('underscore');


exports.render = function(req, res) {

	// ADMIN

	if(req.user != undefined){
		if(req.user.role == 1){
			res.redirect("/admin/");
		}else{
			res.render('index', {
		        user: req.user ? JSON.stringify(req.user) : "null"
		    });
		}
	}else{
		res.render('index', {
	        user: req.user ? JSON.stringify(req.user) : "null"
	    });
	}
    
};
