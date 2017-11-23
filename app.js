var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    path = require('path'),
    config = require('./configLib/config'),
    database = require('./configLib/database'),
    session = require('express-session'),
    database = require('./configLib/database'),
    MongoStore = require('connect-mongodb-session')(session),
    logger = require('./configLib/logger'),
    port = config.port,
    store = new MongoStore({
        uri: config.databaseConnectionUrl,
        collection: 'mySessions'
    });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: config.appSecretKey,
    resave: false,
    cookie: { maxAge: 2628000000 },
    saveUninitialized: true,
    store: store,
    clear_interval: 60 * 60
}))
app.set('views', path.join(__dirname, 'html'));
app.engine('html', require('ejs').renderFile);
app.get('/', function(req, res) {
    if (!req.session.name) {
        req.session.name = "user " + Math.floor((Math.random() * 100000) + 1) + "";
        //store.save({ name: "user " + Math.floor((Math.random() * 100) + 1) + "" })
    }

    res.render('main.html')
})
database.connect(config.databaseConnectionUrl, function(resultObj) {
    if (resultObj.status) {
        console.log('connected to database successfully !!!');
        logger.info('connected to database successfully !!!');
        databaseObj = resultObj.db;
    }
})
var ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
var BASE = ALPHABET.length;

function encodeUrl(num) {
    var sb = new String();
    while (num.length > 0) {
        sb += ALPHABET.charAt(num.length % BASE);
        num /= BASE;
    }
    return sb;
}
app.post('/links', function(req, res) {
    if (req.body.linkValue) {
        var result = encodeUrl(req.body.linkValue),
            repsoneObj = new Array();
        database.insertRecord({ encodedLink: result, linkId: Math.floor((Math.random() * 100) + 1), userLink: req.body.linkValue, userName: req.sessionID }).then(function(docs, error) {
            if (error) {
                logger.info('failed to insert record');
            } else {
                logger.info('successfully inserted record');
                database.executeQuery(undefined, req.sessionID).then(function(docs, error) {
                    if (docs) {
                        console.log(docs)
                        for (var i = 0; i < docs.length; i++) {
                            repsoneObj.push(new Object({
                                userId: docs[i].userName,
                                id: docs[i].linkId,
                                encodeText: docs[i].encodedLink,
                                userLink: docs[i].userLink
                            }))
                        }
                        res.send(repsoneObj);
                    } else {
                        res.sendStatus([]);
                    }
                });


            }
        })
    }

})
app.get('/links', function(req, res) {
    var repsoneObj = new Array();
    database.executeQuery(undefined, req.sessionID).then(function(docs, error) {
        if (docs) {
            for (var i = 0; i < docs.length; i++) {
                repsoneObj.push(new Object({
                    userId: docs[i].userName,
                    id: docs[i].linkId,
                    encodeText: docs[i].encodedLink,
                    userLink: docs[i].userLink
                }))
            }
            res.send(repsoneObj);
        } else {
            res.sendStatus([]);
        }
    });
})
app.delete('/links', function(req, res) {
	var   repsoneObj = new Array();
    if (req.sessionID) {
        database.deleteRecord({ userName: req.sessionID, id: req.query.id }).then(function(docs, error) {
            if (docs.ok) {
                logger.info('successfully deleted record');
                database.executeQuery(undefined, req.sessionID).then(function(docs, error) {
                    if (docs) {
                        for (var i = 0; i < docs.length; i++) {
                            repsoneObj.push(new Object({
                                userId: docs[i].userName,
                                id: docs[i].linkId,
                                encodeText: docs[i].encodedLink,
                                userLink: docs[i].userLink
                            }))
                        }
                        res.send(repsoneObj);
                    } else {
                        res.sendStatus([]);
                    }
                });
            } else {
                logger.info('error in deleting record');
                  res.sendStatus([]);
            }
        })
    }
})
app.listen(port, function() {
    console.log('listening to port ' + port);
})