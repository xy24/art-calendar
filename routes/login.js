/**
 * Created by Ting on 4/18/16.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:action', function(req, res, next) {
    var action = req.params.action;
    res.render('login', { title: 'login', actionAfterLogin: action});
});

// Since we only have one user who needs to login, we
// hard coded her username and password. We used the
// session middleware introduced to us in the security lab,
// and admittedly, if security were a bigger concern of our
// client, we could have switched to passport.js.
router.post('/validityCheck', function(req, res, next) {
    console.log("inside validity check");
    var userName = req.body.userName,
        password = req.body.password,
        action = req.body.action;
    if (userName == "Arts@Brown" && password == "Arts@BrownU_2016") {
        console.log("user is valid");
        // Regenerating in each login
        req.session.regenerate(function() {
            req.session.userId = "ABC123";
            console.log("action is " + action);
            if (action == "upload") {
                return res.redirect("/upload");
            } else if (action == "remove") {
                return res.redirect("/remove");
            }
            // default is upload
            return res.redirect("/upload");
        });
    } else {
        res.send("Access denied");
    }

});
module.exports = router;
