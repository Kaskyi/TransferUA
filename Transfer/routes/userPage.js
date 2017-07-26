var express = require('express');
var router = express.Router();
var daoFactory = require('../models/DAOFactory');

function loadUserPage(req, res) {
    var dAOPeople = daoFactory.TransferDAO();
    var myCallback = function (data) {
        if (data) {
            res.render('user', { is_guest: false, name: req.currentUser.name, email: req.currentUser.email, considereds: data });
        }
        else
            res.render('user', { is_guest: false, name: req.currentUser.name, email: req.currentUser.email, considereds: [] });
    };
    dAOPeople.findTransfersByCustomerId(req.session.user_id, myCallback);
};


/* POST query. */
router.post('/', function (req, res) {
    console.log("User Page post method route");
    loadUserPage(req, res);
});
/* GET query. */
router.get('/', function (req, res) {
    console.log("User Page get method route");
    loadUserPage(req, res);
});
module.exports = router;