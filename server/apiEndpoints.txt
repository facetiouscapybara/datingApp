User Routes

// Returns profile of userInArea if neither user is blocked by the other user.
GET      '/api/users/?id=id&userInArea=userId'

// Returns profile information of specified user.
GET      '/api/users/:id'

// Creates a new user
POST     '/api/users/'

// Updates a user's profile
PUT      '/api/users/:id'

// Deletes a user's profile
DELETE   '/api/users/:id'


Relationship Routes

// Gets all users that are associated with another user based on a specified
// relationship regardless of the direction of the relationship.
GET      'api/relationship/?id=id&relationship=relationsipName'

// Creates a new relationship
POST     '/api/relationship/'

// Deletes a relationship
DELETE   '/api/relationship/'

Login Routes

// Adds a new user to the DB or updates the user's access_token in the DB.
POST     '/api/login'

