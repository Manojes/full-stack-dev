const mongoose = require("mongoose");

//create scheme

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase:true,
    trim:true
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min:18
  },
  gender: {
    type: String,
    validate(value){
       if(!["male","female","others"].includes(value)) {
        throw new Error("gender data is not valid")
       }
    }
    // customvalidaton
  },
  photoURL: {
    type: String,
  },
  about: {
    type: String,
    default:"this is the default about of the user"
  },
  skills:{
    type:[String],
  }
},{
  timestamps:true
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
