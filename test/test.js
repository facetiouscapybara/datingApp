var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var createNewUser = require('../server/controllers/accountControllers.js').createNewUser;
var deleteUser = require('../server/controllers/accountControllers.js').deleteUser;
chai.use(chaiHttp);
var app = 'http://localhost:3000';

describe('The accounts controller', function() {
  it('should create a new user', function(done){
  	
  var newUser = {
  	  facebookId: 345,
  	  name: "Jack Sparrow",
  	  age: 45,
	    picture: "Good Photo",
	    gender: "male",
	    preference: "null",
	    bio: "null"   
  	};
  	chai.request(app)
  	  .post('/api/account')
  	  .send(newUser)
  	  .end(function (err, res) {
  	     expect(err).to.be.null;
  	     expect(res).to.have.status(200);
  	     expect(res.body.name).to.equal('Jack Sparrow');
  	     done();
  	  });
  });

  it('should select a single user when given a facebook id', function(done){

  	var newUser = { facebookId : 345};
  	chai.request(app)
  	  .post('/api/getUser')
  	  .send(newUser)
  	  .end(function (err, res) {
  	     expect(err).to.be.null;
  	     expect(res).to.have.status(200);
  	     expect(res.body.name).to.equal('Jack Sparrow');
  	     done();
  	  });
  });

  it('should update a user', function(done){

  	var updatedInfo = {
  		facebookId : 345,
  		preference : 'women',
  		bio : 'likes long walks along the beach'
  	};
  	chai.request(app)
  		.put('/api/account')
  		.send(updatedInfo)
  		.end(function (err, res) {
  			expect(err).to.be.null;
  			expect(res).to.have.status(200);
  			expect(res.body.preference).to.equal('women');
  			done();
  		});
  });

  it('should delete user accounts', function(done){

  	var facebookId = {facebookId : 345};
  	chai.request(app)
  		.delete('/api/account')
  		.send(facebookId)
  		.end(function (err, res) {
  			expect(err).to.be.null;
  			chai.request(app)
  				.post('/getUser')
  				.send(facebookId)
  				.end(function (getErr, getRes) {
  					expect(getErr).to.be.null;
  					expect(getRes.body.name).to.equal(undefined);
  					done();
  				});
  		});
  });

});

describe('The relationship controller', function(){

 before(function(done){

   var params = {
   neil : {
   	  facebookId: 346,
   	  name: "Neil Degrass Tyson",
   	  age: 54,
 	    picture: "Kinda creepy photo",
 	    gender: "male",
 	    preference: "supernovas",
 	    bio: "I love the universe"   
   	},
   	jack : {
   	  facebookId: 347,
   	  name: "Jack Sparrow",
   	  age: 45,
 	    picture: "Good Photo",
 	    gender: "male",
 	    preference: "null",
 	    bio: "null"   
   	},
   	raw : {
   	  facebookId: 348,
   	  name: "Raw Dog",
   	  age: 35,
 	    picture: "Sketchy Photo",
 	    gender: "male",
 	    preference: "anything",
 	    bio: "Someone to stay away from"   
   	},
   	sweeny : {
   	  facebookId: 349,
   	  name: "Sweeny",
   	  age: 24,
 	    picture: "Brian Sweeny",
 	    gender: "male",
 	    preference: "women",
 	    bio: "Is the product owner of raw dog"   
   	}};

  	createNewUser(params.neil, function(res){
  		createNewUser(params.jack, function(res){
  			createNewUser(params.raw, function(res){
  				createNewUser(params.sweeny, function(res){
  					done();
  				});
  			});
  		});
  	});	 
 });

 it('should create new relationships between nodes', function(done){
 		
	var params = {raw : {
	  userFacebookId: 346,
	  targetFacebookId: 348,
	  relationship: "blocked",
	  tag: 'creep'
 	},
	  sweeny : {
	  userFacebookId: 346,
	  targetFacebookId: 349,
	  relationship: "selected",
	  tag: 'cool'
 	}};

	chai.request(app)
	  .post('/api/relationship')
	  .send(params.raw)
	  .end(function (err, res) {
	     expect(err).to.be.null;
	     expect(res).to.have.status(201);
	     expect(res.body.columns[0]).to.equal('creep');

	     	chai.request(app)
	     	  .post('/api/relationship')
	     	  .send(params.sweeny)
	     	  .end(function (err, res) {
	     	     expect(err).to.be.null;
	     	     expect(res).to.have.status(201);
	     	     expect(res.body.columns[0]).to.equal('cool');
	     	     done();
	     	  });
	    });
  });

 it('should filter the users based on relationships', function(done){
 	
 	var params = {
 		userFacebookId : 346,
 		usersInArea : [347, 348, 349]
 	};

 	chai.request(app)
 	  .post('/api/getUsers')
 	  .send(params)
 	  .end(function (err, res) {
 	     expect(err).to.be.null;
 	     expect(res).to.have.status(200);
 	     expect(res.body[0].row[0].name).to.equal('Jack Sparrow');
 	     done();
 	  });
 });

it('should return user connections based on the relationship type', function(done){
		
		var params = {
			userFacebookId : 348,
			relationship : 'blocked'
		};
		chai.request(app)
		  .post('/api/connections')
		  .send(params)
		  .end(function (err, res) {
		     expect(err).to.be.null;
		     expect(res).to.have.status(200);
		     expect(res.body[0].row[0].name).to.equal('Neil Degrass Tyson');
		     done();
		  });
});

it('should delete user relatinships', function(done){
		
		var params = {
			userFacebookId : 346,
			targetFacebookId : 349,
			relationship : 'selected'
		};
		chai.request(app)
		  .delete('/api/relationship')
		  .send(params)
		  .end(function (err, res) {
		     expect(err).to.be.null;
		     expect(res).to.have.status(201);
		  	var params = {
		  		facebookId : 346,
		  		usersInArea : [347, 348, 349]
		  	};
		  	chai.request(app)
		  	  .post('/api/getUsers')
		  	  .send(params)
		  	  .end(function (err, res) {
		  	     expect(err).to.be.null;
		  	     expect(res).to.have.status(200);
		  	     expect(res.body.length).to.equal(2);
		  	     done();
		  	  });
		 });
});
 after(function(done){
 	deleteUser({facebookId : 346}, function(res){
 		deleteUser({facebookId : 347}, function(res){
 			deleteUser({facebookId : 348}, function(res){
 				deleteUser({facebookId : 349}, function(res){
 					done();
 				}); 			
 			});
 		});
 	});		
 });
});