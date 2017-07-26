var express = require('express');
var router = express.Router();
//http://www.free-css.com/free-css-templates/page196/butterfly
/* GET home page. */
router.get('/', function (req, res) {
    var is_guest = true;
    if (req.session.user_id) {
        is_guest = false;
    }
    res.render('present', { is_guest: is_guest });
});

module.exports = router;