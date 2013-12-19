/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User');


exports.index = function(req,res,next){
    res.render('admin', {
        user: req.user ? JSON.stringify(req.user) : "null"
    });
};

/**
 * Auth callback
 */

exports.authCallback = function(req, res, next) {
    res.redirect('/');
};

/**
 * Show login form
 */

exports.signin = function(req, res) {
    res.render('users/admin/signin', {
        title: 'Signin',
        message: req.flash('error')
    });
};


/**
 * Show sign up form
 */

exports.signup = function(req, res) {
    res.render('users/admin/signup', {
        title: 'Sign up',
        user: new User()
    });
};

/**
 * Logout
 */

exports.signout = function(req, res) {
    req.logout();
    res.redirect('/Signin');
};

/**
 * Session
 */

exports.session = function(req, res) {
    res.redirect('/admin/');
};

/**
 * Create user
 */

exports.create = function(req, res) {
    var user = new User(req.body);
    var message = null;

    user.provider = 'local';
    user.save(function(err) {
        if (err) {
            switch(err.code){
                case 11000:
                case 11001:
                    message = 'Username already exists';
                    break;
                default: 
                    message = 'Please fill all the required fields';
            }

            return res.render('users/signup', {
                message: message,
                user: user
            });
        }
        req.logIn(user, function(err) {
            if (err) return next(err);
            return res.redirect('/');
        });
    });
};

/**
 * Send User
 */

exports.me = function(req, res) {
    res.jsonp(req.user || null);
};

/**
 * Find user by id
 */

exports.user = function(req, res, next, id) {
    User
        .findOne({
            _id: id
        })
        .exec(function(err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load User ' + id));
            req.profile = user;
            next();
        });
};

/**
* Remove user
*/

exports.remove = function(req,res,next,id){
    User.remove({ _id: id }, function (err) {
      if (err) return handleError(err);
      next();
    });
};

/**
* Update user
*/

exports.update = function(req,res,next){

    var id = req.params.id;

    User.findById(id, function (err, user) {
      if (err) return handleError(err);
      
      user = req.body.user;

      user.save(function (err) {
        if (err) return handleError(err);
        res.send(user);
      });

    });

};

/**
* Return the list of users
*/

exports.list = function(req,res){

    var page = 0;

    if(req.params.page !== undefined)
        page = req.params.page;
    
    Entity.listPage(page,function(err,entities){
        if(err) res.send(500);
        res.send(entities);
    });

    User.find({}, {}, { skip: page*20, limit: 20 }, function(err, results) { 
        if(err) return handleError(err);
        res.send(results);
    });

};

/**
* Return the quantity of users
*/

exports.count = function(req,res){

    User.count({}, function( err, count){
        if(err) return handleError(err);
        res.send({'count':count});
    });
};

/**
* Search users by email
*/

exports.searchByEmail = function(req,res){

    User.find({email : req.body.email}, {}, function(err, results) { 
        if(err) return handleError(err);
        res.send(results);
    });
    
};