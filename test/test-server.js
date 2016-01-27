var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);
var app = 'http://localhost:3000';

describe('Accounts', function() {
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









