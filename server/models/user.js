const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const SALT_FACTOR = 10;

let userSchema = mongoose.Schema({
    username:{type:String,required:true},
    email: {type:String,required:true},
    password: {type:String,required:true},
    private: Boolean,
    createdAt: {type: Date, default: Date.now},
    isAdmin: Boolean 
});

let noop = function(){};

userSchema.pre('save',function(done){
    let user = this;
    if(!user.isModified('password')){
        return done();
    }
    bcrypt.genSalt(SALT_FACTOR,function(err,salt){
        if(err){
            return done(err);
        }
        bcrypt.hash(user.password,salt,noop,function(err,hashedPassword){
            if(err){
                return done(err);
            }
            user.password = hashedPassword;
            done();
        });
    });
});


userSchema.methods.checkPassword = function(guess,done){
    bcrypt.compare(guess,this.password,function(err,isMatch){
        done(err,isMatch);
    });
};

userSchema.methods.generateJwt = function () {
	const expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);

	return jwt.sign({
		_id: this._id,
		email: this.email,
		username: this.username,
		exp: parseInt(expiry.getTime() / 1000)
	}, 'process.env.JWT_SECRET');
};


let User = mongoose.model('User',userSchema);
module.exports = User;