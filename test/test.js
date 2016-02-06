var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var createNewUser = require('../server/controllers/accountControllers.js').createNewUser;
var deleteUser = require('../server/controllers/accountControllers.js').deleteUser;
chai.use(chaiHttp);
var app = 'http://localhost:3000';

describe('The server side API controllers', function(){

  describe('The users controller', function() {
    it('should create a new user', function(done){
      
    var newUser = {
        id: '2439237345',
        first_name : "Jack",
        name: "Jack Sparrow",
        age: 45,
        picture: "Good Photo",
        gender: "male",
        preference: "null",
        bio: "null",
        education : "The Streets",
        industry : "Thievery"
      };
      chai.request(app)
        .post('/api/users')
        .set('Authorization', 'Bearer i24gowinvnweajoi')
        .send(newUser)
        .end(function (err, res) {
           expect(err).to.be.null;
           expect(res).to.have.status(200);
           expect(res.body.name).to.equal('Jack Sparrow');
           done();
        });
    });

    it('should select a single user when given a facebook id', function(done){
      chai.request(app)
        .get('/api/users/2439237345')
        .set('Authorization', 'Bearer i24gowinvnweajoi')
        .end(function (err, res) {
           expect(err).to.be.null;
           expect(res).to.have.status(200);
           expect(res.body.name).to.equal('Jack Sparrow');
           done();
        });
    });

    it('should update a user', function(done){

      var updatedInfo = {
        preference : 'women',
        bio : 'likes long walks along the beach'
      };
      chai.request(app)
        .put('/api/users/2439237345')
        .set('Authorization', 'Bearer i24gowinvnweajoi')
        .send(updatedInfo)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.preference).to.equal('women');
          done();
        });
    });

    it('should delete user accounts', function(done){

      chai.request(app)
        .delete('/api/users/2439237345')
        .set('Authorization', 'Bearer i24gowinvnweajoi')
        .end(function (err, res) {
          expect(err).to.be.null;
          chai.request(app)
            .get('/api/users/2439237345')
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
        id: '346',
        first_name : "Neil",
        name: "Neil Degrass Tyson",
        age: 54,
        picture: "Kinda creepy photo",
        gender: "male",
        preference: "supernovas",
        bio: "I love the universe",
        education : "Oxford",
        industry : "The stars"  
      },
      jack : {
        id: '347',
        first_name : "Jack",
        name: "Jack Sparrow",
        age: 45,
        picture: "Good Photo",
        gender: "male",
        preference: "null",
        bio: "null",
        education : "The High Seas",
        industry : "Thievery"  
      },
      raw : {
        id: '348',
        name: "Raw Dog",
        first_name: "Raw",
        age: 35,
        picture: "Sketchy Photo",
        gender: "male",
        preference: "anything",
        bio: "Someone to stay away from",
        education : "The Streets",
        industry : "Thievery" ,

      },
      sweeny : {
        id: '349',
        name: "Sweeny",
        first_name: "Brian",
        age: 24,
        picture: "Brian Sweeny",
        gender: "male",
        preference: "women",
        bio: "Is the product owner of raw dog",
        education : "College",
        industry : "Developer"   
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
      userId: "346",
      targetId: "348",
      relationship: "blocked",
      tag: 'creep'
    },
      sweeny : {
      userId: "346",
      targetId: "349",
      relationship: "selected",
      tag: 'cool'
    }};

    chai.request(app)
      .post('/api/relationship')
      .set('Authorization', 'Bearer i24gowinvnweajoi')
      .send(params.raw)
      .end(function (err, res) {
         expect(err).to.be.null;
         expect(res).to.have.status(201);
         expect(res.body.columns[0]).to.equal('creep');

          chai.request(app)
            .post('/api/relationship')
            .set('Authorization', 'Bearer i24gowinvnweajoi')
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

    chai.request(app)
      .get('/api/users/?id=346&userInArea=347')
      .set('Authorization', 'Bearer i24gowinvnweajoi')
      .end(function (err, res) {
         expect(err).to.be.null;
         expect(res).to.have.status(200);
         expect(res.body.name).to.equal('Jack Sparrow');
         done();
      });
   });

  it('should return user connections based on the relationship type', function(done){
    chai.request(app)
      .get('/api/relationship/?id=348&relationship=blocked')
      .set('Authorization', 'Bearer i24gowinvnweajoi')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body[0].row[0].name).to.equal('Neil Degrass Tyson');
        done();
      });
  });

  it('should delete user relatinships', function(done){
      
    var params = {
      userId : "346",
      targetId : "348",
      relationship : 'blocked'
    };
    chai.request(app)
      .get('/api/users/?id=346&userInArea=348')
      .set('Authorization', 'Bearer i24gowinvnweajoi')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        expect(res.body.name).to.equal(undefined);
        chai.request(app)
          .delete('/api/relationship')
          .set('Authorization', 'Bearer i24gowinvnweajoi')
          .send(params)
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            chai.request(app)
              .get('/api/users/?id=346&userInArea=348')
              .set('Authorization', 'Bearer i24gowinvnweajoi')
              .end(function (err, res) {
                 expect(err).to.be.null;
                 expect(res).to.have.status(200);
                 expect(res.body.name).to.equal("Raw Dog");
                 done();
              });
          });
      });
  });
   after(function(done){
    deleteUser("346", function(res){
      deleteUser("347", function(res){
        deleteUser("348", function(res){
          deleteUser("349", function(res){
            done();
          });       
        });
      });
    });   
   });
  });
});