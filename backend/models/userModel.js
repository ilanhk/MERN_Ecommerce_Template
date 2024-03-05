import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // to unhash passwords

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    email: {
        type: String, 
        required: true,
        unique: true,
    },
    password: {
        type: String, 
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true,
});


userSchema.methods.matchPassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password); //see if enter password matches the password in the db
};

userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next(); 
    }; //if dealing with user data without password it will move on
    
    //if modifying password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
}); // .pre - allows us to do something before the data is saved in the db, .post is to do something after saved in db

const User = mongoose.model("User", userSchema);

export default User;