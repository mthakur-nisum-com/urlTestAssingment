var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    databaseObj = null,
    promiseObj = require('node-promise'),
    collection = null,
    logger = require('./logger');
module.exports = {
    connect: function(connectionUrl, callback) {
        console.log(connectionUrl);
        logger.debug('connecting to database ' + connectionUrl + '');
        MongoClient.connect(connectionUrl, function(err, db) {
            assert.equal(null, err);
            if (err) {
                logger.error("Error in connecting to database");
                callback({ status: false, error: err })
            } else {
                databaseObj = db;
                logger.debug("Connected correctly to server");
                logger.debug("Connected correctly to server");
                collection = db.collection('user_links')
                callback({ status: true, error: null, db: db });
            }

        });
    },
    insertRecord: function(Obj) {
        if (databaseObj) {
            //console.log(Obj)
            return collection.insert(Obj)
        }
    },
    executeQuery: function(queryType, param, callback) {
        console.log(param)
        if (databaseObj) {
            switch (queryType) {
                case 'get_links':
                    return collection.find(param);
                default:
                    return collection.find({'userName':param}).toArray();
            }
        }
    },
    deleteRecord:function(param){
        if(databaseObj){
            return collection.findOneAndDelete(param)
        }
    }
}