var mongoose = require('mongoose');
var model = require('./model.js');
var _ = require('underscore');
var express = require('express');
var app = express();
var path = require('path');
var swig = require('swig');
var bodyParser = require('body-parser');
var _ = require("underscore");

// view engine setup
app.set('views', path.join(__dirname, '/view'));
var swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

app.use(bodyParser.json({
    limit: '100mb'
}));
app.use(bodyParser.urlencoded({
    limit: '100mb',
    extended: true
}));




mongoose.connect('mongodb://localhost/donarTable', function(err) {

    if (err) throw err;

    console.log('Successfully connected');


    app.get('/', function(req, res) {

        model.hospital.find({}, function(err, dbUsers) {
            if (err) throw err;
            console.log(JSON.stringify(dbUsers));
            res.render('index', {
                values: dbUsers
            });
        });

    }).listen(8000);

    app.post('/addRecipient', function(req, res) {
        var body = _.pick(req.body, 'hospitalName', 'hospitalAddress', 'hospitalCity', 'hospitalState', 'hospitalPhoneNumber', 'recipientName', 'recipientBloodGroup', 'acceptableDonorBloodGroup', 'unitRequire', 'bloodNeedIsUrgent')
        var hospitalObject = new model.hospital({
            hospitalName: body.hospitalName,
            hospitalAddress1: body.hospitalAddress,
            hospitalAddress2: body.hospitalCity,
            hospitalAddress3: body.hospitalState,
            hospitalPhoneNumber: body.hospitalPhoneNumber,
            RecipientName: body.recipientName,
            RecipientBloodGroup: body.recipientBloodGroup,
            AcceptableDonorBloodGroup: body.acceptableDonorBloodGroup,
            BloodNeedUrgent: body.bloodNeedIsUrgent,
            Unit: body.unitRequire
        });

        hospitalObject.save(function(err) {
            if (err) throw err;
            model.hospital.find({}, function(err, dbUsers) {
                if (err) throw err;
                console.log('===>>>' + JSON.stringify(dbUsers));
                res.render('index', {
                    values: dbUsers
                });
            });
        })

    })


});
