const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Lecturer = require('../api/models/lecturerModel');
const User = require('../api/models/userModel');
const config = require('../config/database');

// Lecturer
module.exports = function(passport){
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        Lecturer.getUserByEmail(jwt_payload.data.email, (err, user) => {
            if(err){
                return done(err, false);
            }
            if(user){
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));
}

// User
// module.exports = function(passport){
//     var opts = {};
//     opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
//     opts.secretOrKey = config.secret;
//     passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
//         User.getUserById(jwt_payload.data._id, (err, user) => {
//             if(err){
//                 return done(err, false);
//             }
//             if(user){
//                 return done(null, user);
//             }
//             else {
//                 return done(null, false);
//             }
//         });
//     }));
// }