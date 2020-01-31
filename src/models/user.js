import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String
});

userSchema.methods.comparePassword = async function(plainTextPassword) {
    return await bcrypt.compareSync(plainTextPassword, this.password);
};

userSchema.methods.generateAuthToken = function() {
    // Generate an auth token for the user
    // const user = this
    const token = jwt.sign({_id: this._id}, process.env.JWT_KEY)
    // user.tokens = user.tokens.concat({token})
    // await user.save()
    return token
}

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hashSync(this.password, 10);
    next();
});

// userSchema.method.comparePassword = (plaintext) => {
//     return bcrypt.compareSync(plaintext, this.password);
//     // return callback(null, bcrypt.compareSync(plaintext, this.password));
// };


module.exports = mongoose.model('User', userSchema);;