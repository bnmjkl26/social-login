module.exports = function (app, fs, passport) {
    var userjsonDir = __dirname + "/../data/user.json";
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database('DB.db');

    app.get('/', function (req, res) {
        console.log("/")
        console.log(req.user)
        if(!req.user == false){
            var email =  req.user.email;
            var familyName = req.user.familyName;
            var givenName = req.user.givenName;
        }
        res.render('index', {
            title: "MY HOMEPAGE",
            length: 5,
            email : email,
            familyName : familyName,
            givenName : givenName
        })
    });

    //google
    app.get("/auth/google", passport.authenticate("google", { scope: ['profile', 'email'] }));
    app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function (req, res) {
        var sess = req.session;
        console.log("/auth/google/callback")
        res.redirect('/');
    });

    //facebook
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/'
    }), function (req, res) {
        res.redirect('/');
    });


    app.get('/logout', function (req, res) {
        var sess = req.session;
        req.session.destroy(function (err) {
            res.redirect('/');
        })
    })


}



    // app.get('/login/:email', function (req, res) {
    //     console.log(req.session)
    //     var sess = req.session;
    //     var email = req.params.email;

    //     db.all("SELECT * FROM ICOP WHERE EMAIL ='" + email + "'", function (err, rows) {
    //         if (err) {
    //             console.log(err)
    //         } else if (rows.length != 0) {
    //             sess.email = email;
    //             res.json(rows);
    //         } else {
    //             res.json("can not found email")
    //         }
    //     });
    // });
