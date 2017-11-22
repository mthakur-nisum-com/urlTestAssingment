module.exports = {
	port:process.env.port || 9900,
	databaseConnectionUrl :'mongodb://manoj1237:manoj_1237@ds251435.mlab.com:51435/foodattable',
	appSecretKey:'foodAtTableApplicationWithMongoose',
	sessionMaxAge:6000
}