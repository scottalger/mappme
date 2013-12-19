/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Location = mongoose.model('Location');


function handleError(res, err){
    res.send(500,{err: err.message});
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
    res.render('users/signin', {
        title: 'Signin',
        message: req.flash('error')
    });
};

/**
 * Show sign up form
 */

exports.signup = function(req, res) {
    res.render('users/signup', {
        title: 'Sign up',
        user: new User()
    });
};

/**
 * Logout
 */

exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

/**
 * Session
 */

exports.session = function(req, res) {
    res.redirect('/');
};

/**
 * Create user and login
 */

exports.createAndLogin = function(req, res) {
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
 * Create user
 */

exports.create = function(req, res, next) {
    var user = new User(req.body);
    var message = null;

    console.log("CREATE");

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
        }
        
        res.send(user);
    });
};

/**
 * Read user by id
 */

exports.read = function(req, res, next) {

    console.log("READ", req.params.id);

    var id = req.params.id;

    User
        .findOne({
            _id: id
        })
        .exec(function(err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load User ' + id));
            req.profile = user;
            res.send(user);
        });
};


/**
* Delete user
*/

exports.delete = function(req,res,next){

    console.log("REMOVE", req.params.id);

    User.remove({ _id: req.params.id }, function (err) {
      if (err) return handleError(res,err);
      res.send(200);
    });
};

/**
* Update user
*/

exports.update = function(req,res,next){

    var id = req.params.id;

    console.log("UPDATE", req.body);

    User.findById(id, function (err, user) {
      if (err) return handleError(res,err);
        
      console.log("USER TO UPDATE",user, req.body);

      user.first_name = req.body.first_name;
      user.last_name = req.body.last_name;
      user.email = req.body.email || user.email;
      user.username = req.body.username || user.username;
      user.organization = req.body.organization || user.organization;

      user.latitude = req.body.latitude || user.latitude;
      user.longitude = req.body.longitude || user.longitude;

      user.save(function (err) {
        if (err) return handleError(res,err);
        res.send(user);
      });

    });

};

/**
 * Send User
 */

exports.me = function(req, res) {

    console.log("ME");

    res.jsonp(req.user || null);
};

/**
* Return the list of users
*/

exports.list = function(req,res){

    console.log("LIST");

    var page = 0;

    if(req.params.page !== undefined)
        page = req.params.page;

    User.find({}, {}, { skip: page*20, limit: 20 }, function(err, results) { 
        if(err) return handleError(res,err);
        res.send(results);
    });

};

/**
* Return the quantity of users
*/

exports.count = function(req,res){

    console.log("COUNT");

    User.count({}, function( err, count){
        if(err) return handleError(res,err);
        res.send({'count':count});
    });
};

/**
* Search users by email
*/

exports.search = function(req,res){

    console.log("SEARCH");

    User.find({email : req.body.email}, {}, function(err, results) { 
        if(err) return handleError(res,err);
        res.send(results);
    });

};

/**
* Update location of user
*/

exports.setLocation = function(req,res){
    var location = new Location(req.body);

    Location.findOne({user : req.params.id},{},function(err,loc){
        if(err) return next(err);
        
        if(loc != null){
            loc.latitude = req.body.latitude;
            loc.longitude = req.body.longitude;
            loc.save(function(err){
                if(err) return next(err);
                res.send(loc);
            });
        }else{
            location.save(function(err){
                if(err) return next(err);
                res.send(location);
            });
        };

    });

};