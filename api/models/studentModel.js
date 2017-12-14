const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../../config/database');

// Student Schema
const StudentSchema = mongoose.Schema({
    // _id: {
    //     Schema.ObjectId
    // },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    studentId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const Student = module.exports = mongoose.model('Student', StudentSchema);

// module.exports.getUserById = function(id, callback) {
//     Student.findById(id, callback);
// }

module.exports.getUserById = function(id, callback) {
    const query = { id : id }
    Student.findOne(query, callback);
}

module.exports.addUser = function (newStudent, callback){
    // genSalt = a random key to hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newStudent.password, salt, (err, hash) => {
            if(err) throw err;
            newStudent.password = hash;
            newStudent.save(callback);
        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}