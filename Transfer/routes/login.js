var express = require('express');
var router = express.Router();
var daoFactory = require('../models/DAOFactory');


function authenticateFromLoginToken(req, res, next) {
    var cookie = JSON.parse(req.cookies.logintoken);
    
    LoginToken.find({
        email: cookie.email,
        series: cookie.series,
        token: cookie.token
    })
            .first(function (token) {
        if (!token) {
            res.redirect('/');
            return;
        }
        
        User.find({ email: token.email }).first(function (user) {
            if (user) {
                req.session.user_id = user.id;
                req.currentUser = user;
                
                token.token = token.randomToken();
                token.save(function () {
                    res.cookie('logintoken', token.cookieValue, {
                        expires: new Date(Date.now() + 2 * 604800000),
                        path: '/'
                    });
                    next();
                });
            } else {
                res.redirect('/');
            }
        });
    });
}

function loadUser(req, res, next) {
    if (req.session.user_id) {
        console.log("SES ID : " + req.session.user_id)
        User.findById(req.session.user_id, function (user) {
            if (user) {
                req.currentUser = user;
                next();
            } else {
                res.redirect('/sessions/new');
            }
        });
    } else if (req.cookies.logintoken) {
        authenticateFromLoginToken(req, res, next);
    } else {
        res.redirect('/sessions/new');
    }
}


function loadUserS(req, res, next) {
    console.log("Check log IN");
    if (req.session.user_id) {
        console.log("Have session");
        console.log("SES ID : " + req.session.user_id)
        daoFactory.createConnection();
        var dAOPeople = daoFactory.PeopleDAO();
        
        var myCallback = function (data) {
            if (data) {
                console.log("DATA " + data);
                req.currentUser = data;
                console.log(!!next);
                if (next == 'underfined') {
                    
                    res.redirect("/userPage");
                }
                else               
                    next();
            }
            else
                res.redirect("/");
        };
        dAOPeople.findAManByID(req.session.user_id, myCallback);

    } else if (req.cookies.logintoken) {
        console.log("Have cookies");
        //TODO LOAD AND CHECK COOKIES FORM DB 
       /* authenticateFromLoginToken(req, res, next);*/
        res.redirect('/');
    } else {
        console.log("I dont know ");
        res.redirect('/');
    }
}




router.post('/', function (req, res, next) {
    loadUserS(req, res, next); 
});

router.get('/', function (req, res, next) {
    loadUserS(req, res, next);
});


module.exports = router;