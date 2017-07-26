var express = require('express');
var router = express.Router();
var daoFactory = require('../models/DAOFactory');
// XSS(https://github.com/chriso/validator.js#sanitizers)
// form myself Ajax or soccets for : Your password should be a 6 symbols long
// Check for Exist person in db
router.post('/', function (req, res, next) {
    console.log("Registration");
    var dAOPeople = daoFactory.PeopleDAO();
    if (req.body.username == '' || req.body.email==''|| req.body.password==''|| req.body.mobile_phone=='') {
        res.redirect("/"); return;
}

   
    var myCallback = function (err) {
        
        if (err != -1) {
            console.log("ID = " + err.id);
                    req.session.user_id = err.id;
                    
                    //TODO Save token cookie TO DB
                    res.cookie('logintoken', err.id, {
                        expires: new Date(Date.now() + 2 * 604800000),
                        path: '/'
                    });
            res.redirect('/userPage');
                }
                else
                    res.redirect("/");
    };
    dAOPeople.insertPeople(req.body, myCallback);
});
module.exports = router;