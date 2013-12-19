
/**
 * Module dependencies.
 */
var should = require('should'),
    app = require('../../../server'),
    mongoose = require('mongoose'),
    supertest = require('supertest'),
    async = require("async"),
    assert = require("assert"),
    User = mongoose.model('User');

var request = supertest(app);

//Globals
var user;

describe("API",function(){

	describe("CRUD", function(){

	    describe("CREATE /api/users/", function(){
	      it('should return the node created as json', function(done){

	      	var data = {
	            first_name: 'Daniel',
	            last_name: 'Flores',
	            email: 'test@test.com',
	            username: 'user',
	            password: 'password'
	        };
	        
	        request.post("/api/users/")
	          .send(data)
	          .set('Accept', 'application/json')
	          .expect(200)
	          .end(function(err, res){
	            if (err) return done(err);
	            done();
	          });
	      });
	    });

	    describe("UPDATE /api/users/:id/", function(){

	    	var user = null;

	    	before(function(done) {
	            user = new User({
	                first_name: 'Daniel',
	                last_name: 'Flores',
	                email: 'test@test.com',
	                username: 'user2',
	                password: 'password'
	            });

	            user.save(done);
	        });

	      	it('should return the node created as json', function(done){
		        
		        var data = {
		            user : {
		            	first_name: 'Daniel',
			            last_name: 'Sánchez',
			            email: 'test@test.com',
			            username: 'user2',
			            password: 'password'
			        }
		        };

		        console.log("/api/users/" + user.id + "/");

		        request.put("/api/users/" + user.id + "/")
		        	.send(data)
		        	.set('Accept', 'application/json')
		          	.expect(200)
		          	.end(function(err, res){
		            	if (err) return done(err);
		            	console.log(res.body);
		            	done();
	          		});
	      	});

	      	after(function(done) {
	            User.remove().exec();
	            done();
	        });

	    });

	    describe("DELETE /api/users/:id/", function(){

	    	var user = null;

	    	before(function(done) {
	            user = new User({
	                first_name: 'Daniel',
	                last_name: 'Flores',
	                email: 'test@test.com',
	                username: 'user',
	                password: 'password'
	            });

	            user.save(done);
	        });

	      	it('should return the node created as json', function(done){

	      		console.log("USER ID TO DELETE : ", user.id);
		        
		        request.del("/api/users/" + user.id + "/")
		          .set('Accept', 'application/json')
		          .expect(200)
		          .end(function(err, res){
		            if (err) return done(err);
		            done();
	          	});
	      	});

	      	after(function(done) {
	            User.remove().exec();
	            done();
	        });

	    });

	    describe("READ /api/users/:id/", function(){

	    	var user = null;

	    	before(function(done) {
	            user = new User({
	                first_name: 'Daniel',
	                last_name: 'Flores',
	                email: 'test@test.com',
	                username: 'user3',
	                password: 'password'
	            });

	            user.save(done);
	        });

	      	it('should return the node created as json', function(done){
	        
	        	request.get("/api/users/" + user.id + "/")
	          	.set('Accept', 'application/json')
	          	.expect(200)
	          	.end(function(err, res){
	            	if (err) return done(err);
	            	done();
	          	});

	      	});

	      	after(function(done) {
	            User.remove().exec();
	            done();
	        });

	    });

	    describe("READ /api/list/users/:page", function(){

	    	before(function(done) {
	            user1 = new User({
	                first_name: 'Daniel',
	                last_name: 'Flores',
	                email: 'test@test.com',
	                username: 'user1',
	                password: 'password'
	            });

	            user2 = new User({
	                first_name: 'Daniel',
	                last_name: 'Flores',
	                email: 'test2@test.com',
	                username: 'user2',
	                password: 'password'
	            });

	            user3 = new User({
	                first_name: 'Daniel',
	                last_name: 'Flores',
	                email: 'test3@test.com',
	                username: 'user3',
	                password: 'password'
	            });

	            async.series([
				    function(callback){
				        user1.save(function(err){
				        	callback(err);
				        });
				    },
				    function(callback){
				        user2.save(function(err){
				        	callback(err);
				        });
				    },
				    function(callback){
				        user3.save(function(err){
				        	callback(err);
				        });
				    }
				],
				function(err, results){
					console.log("RESULTS " ,err, results);
					if(err) return done(err);
				    done();
				});
	        });

	      	it('should return the node created as json', function(done){
	        
	        	request.get("/api/list/users/0/")
	          	.set('Accept', 'application/json')
	          	.expect(200)
	          	.end(function(err, res){
	            	if (err) return done(err);
	            	res.body.should.have.length(3);
	            	done();
	          	});

	      	});

	      	after(function(done) {
	            User.remove().exec();
	            done();
	        });

	    });

	    describe("GET /api/search/users", function(){

	    	before(function(done) {
	            user1 = new User({
	                first_name: 'Daniel',
	                last_name: 'Flores',
	                email: 'test@test.com',
	                username: 'user1',
	                password: 'password'
	            });

	            user2 = new User({
	                first_name: 'Daniel',
	                last_name: 'Flores',
	                email: 'test2@test.com',
	                username: 'user2',
	                password: 'password'
	            });

	            user3 = new User({
	                first_name: 'Daniel',
	                last_name: 'Flores',
	                email: 'test3@test.com',
	                username: 'user3',
	                password: 'password'
	            });

	            async.series([
				    function(callback){
				        user1.save(function(err){
				        	callback(err);
				        });
				    },
				    function(callback){
				        user2.save(function(err){
				        	callback(err);
				        });
				    },
				    function(callback){
				        user3.save(function(err){
				        	callback(err);
				        });
				    }
				],
				function(err, results){
					console.log("RESULTS " ,err, results);
					if(err) return done(err);
				    done();
				});

	        });

	      	it('should return the users with the email queried', function(done){
	        
	        	request.get("/api/search/users/")
	        	.send({
	        		email : "test@test.com"
	        	})
	          	.set('Accept', 'application/json')
	          	.expect(200)
	          	.end(function(err, res){
	            	if (err) return done(err);
	            	res.body.should.have.length(1);
	            	done();
	          	});

	      	});

	      	it('should return 0 users with the email queried', function(done){
	        
	        	request.get("/api/search/users/")
	        	.send({
	        		email : "testss@test.com"
	        	})
	          	.set('Accept', 'application/json')
	          	.expect(200)
	          	.end(function(err, res){
	            	if (err) return done(err);
	            	res.body.should.have.length(0);
	            	done();
	          	});

	      	});

	      	after(function(done) {
	            User.remove().exec();
	            done();
	        });

	    });

		describe("GET /api/users/:id/setLocation/", function(){

			var user1 = null;

	    	before(function(done) {
	            user1 = new User({
	                first_name: 'Daniel',
	                last_name: 'Flores',
	                email: 'test@test.com',
	                username: 'user1',
	                password: 'password'
	            });

	           	user1.save(done);
	        });

	      	it('should set location of user', function(done){
	        
	        	request.post("/api/users/" + user1.id + "/setLocation/")
	        	.send({
	        		latitude : "-12.3333",
	        		longitude : "-12.3333",
	        		user : user1.id
	        	})
	          	.set('Accept', 'application/json')
	          	.expect(200)
	          	.end(function(err, res){
	            	if (err) return done(err);
	            	console.log(res.body);
	            	done();
	          	});

	      	});

	      	after(function(done) {
	            User.remove().exec();
	            done();
	        });

	    });

	});

});