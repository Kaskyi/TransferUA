var express = require('express');
var router = express.Router();
var daoFactory = require('../models/DAOFactory');

function InsertConsignment(data, callback) {
    var dAOPeople = daoFactory.ConsignmentDAO();
    
    var myCallback = function (err) {
        if (err != -1) {
            data.consignmentId = err.id;
            callback(data);
        }
        else
            callback(data, -1);
    };
    dAOPeople.insertConsignment(data, myCallback);
};
function InsertTransfer(data, callback) {
    var dAOTransfer = daoFactory.TransferDAO();
 
    var myCallback = function (err) {
        if (err != -1) {
            callback(data);
        }
        else
            callback(data, -1);
    };
    dAOTransfer.insertTransfer(data, myCallback);
};
var i = 0;
var arrs = [InsertConsignment, InsertTransfer];
function callAsync(data, err) {
    if (err) {
        data.callBack(err);
    }
    
    if (arrs[i]) {
        arrs[i](data, callAsync);
        i++;
    } else {
        i = 0;
        data.callBack();
    }
};

function checkInputs(data) {
    if (data.width == '' || data.height == '' || data.long == '' || data.info == '' 
        || data.start_place == '' || data.end_place == '' || data.start_time == '' || data.end_time == '') {
        return false;
    }
    else
        return true;
};


// POST method route
router.post('/', function (req, res) {
    req.body.customerId = req.currentUser.id;
    if (checkInputs(req.body)) {
        req.body.callBack = function myFunction(err) {
            if (err) {
                res.render('makeOrder', { is_guest: false });
            }
            else {
                res.redirect("/userPage");
            }

        };
        
        callAsync(req.body);
    }
    else
        res.render('makeOrder', { is_guest: false });
});
/* GET home page. */
router.get('/', function (req, res) {
    
    res.render('makeOrder', { is_guest: false });
});
module.exports = router;
