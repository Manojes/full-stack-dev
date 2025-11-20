const mongoose = require('mongoose');

// const connectDB= mongoose.connect('mongodb://127.0.0.1:27017/test');

const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://Manoj_db:Superstar123!@tinder-dev.psnjgfo.mongodb.net/?appName=Tinder-dev")
}

module.exports = connectDB;