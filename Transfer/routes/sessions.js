var express = require('express');
var router = express.Router();
var daoFactory = require('../models/DAOFactory');

/* Post query. */
router.post('/', function (req, res) {
    console.log("Session");
    daoFactory.createConnection();
    var dAOPeople = daoFactory.PeopleDAO();
    
    var myCallback = function (data) {
        
        if (data && data.password == req.body.password) {
            req.session.user_id = data.id;

            //TODO Save token cookie TO DB
            res.cookie('logintoken', data.id, {
                expires: new Date(Date.now() + 2 * 604800000),
                path: '/'
            });
            res.redirect('/userPage');
        }
        else
            res.redirect("/");
    };
    dAOPeople.findAManByEmail(req.body.email, myCallback);
});
router.delete('/', function (req, res) {
    console.log("Session DELETE");
    if (req.session) {
        //TODO DELETE FROM BD
        res.clearCookie('logintoken');
        req.session.destroy(function () { });
    }
    res.redirect('/');
});

module.exports = router;