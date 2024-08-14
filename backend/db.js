const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/Notebook";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("db connected");
    } catch (error) {
        console.error("Error connecting to db:", error);
    }
}

module.exports = connectToMongo;
