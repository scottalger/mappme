module.exports = function(app, passport, auth) {
    
    /** =======================================================================
    *   ADMIN
        =======================================================================**/

    var admin = require("../app/controllers/admin");

    app.get("/admin/", admin.index);

    app.get("/admin/signin", admin.signin);

    app.get("/admin/signup", admin.signup);

    app.post("/admin/signup", admin.create);

    //Setting the local strategy route
    app.post('/admin/session', passport.authenticate('local', {
        failureRedirect: '/admin/signin',
        failureFlash: true
    }), admin.session);

    /** =======================================================================
    *   USERS
        =======================================================================**/

    var users = require('../app/controllers/users');

    app.get('/signin', users.signin);

    app.get('/signup', users.signup);

    app.get('/signout', users.signout);

    app.get('/users/me', users.me);

    app.post('/signup', users.createAndLogin);

    app.get('/api/list/users/:page', users.list);

    app.get('/api/search/users', users.search);

    // CREATE
    app.post('/api/users/', users.create)

    // READ
    app.get('/api/users', users.list);
    app.get('/api/users/:id', users.read);

    // UPDATE
    app.put('/api/users/:id', users.update);

    // DELETE
    app.del('/api/users/:id', users.delete);

    app.post('/api/users/:id/setLocation/', users.setLocation);

    //Setting the local strategy route
    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: true
    }), users.session);

    //Setting the facebook oauth routes
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_about_me'],
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the github oauth routes
    app.get('/auth/github', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the twitter oauth routes
    app.get('/auth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the google oauth routes
    app.get('/auth/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }), users.signin);

    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Finish with setting up the userId param
    app.param('userId', users.read);

    //Article Routes
    
    /*

        var articles = require('../app/controllers/articles');
        app.get('/articles', articles.all);
        app.post('/articles', auth.requiresLogin, articles.create);
        app.get('/articles/:articleId', articles.show);
        
        app.put('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.update);
        app.del('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.destroy);

        //Finish with setting up the articleId param
        app.param('articleId', articles.article);

    */

    //Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);

};
