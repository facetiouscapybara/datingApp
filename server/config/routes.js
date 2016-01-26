var express = require('express');
var accoutControllers = require('accoutControllers.js');
var relationshipControllers = require('relationshipControllers.js');
var locaitonControllers = require('locationControllers.js');
var app = express();

app.post('/api/user', accoutControllers.createNewUser); // COMPLETE
app.get('/api/user', accoutControllers.getUserById); // COMPLETE
app.put('/api/user', accoutControllers.updateUserProfile); // COMPLETE
app.delete('/api/user', accountControllers.deleteUser); // COMPLETE

app.post('/api/relationship', relationshipControllers.createRelationship); // COMPLETE
app.delete('/api/relationship', relationshipControllers.deleteRelationship); // COMPLETE

app.get('/api/getUsers', locaitonControllers.getUsersInArea); // COMPLETE




