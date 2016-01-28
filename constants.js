module.exports = {
	API_URL : process.env.API_URL || "http://127.0.0.1:3000",
	DB_URI : process.env.DB_URI || 'http://datingapp.sb02.stations.graphenedb.com:24789/db/data/transaction/commit',
	FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
	FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET,
	CALLBACK_URL : process.env.CALLBACK_URL || 'http://localhost:3000/api/auth/facebook/callback'
};