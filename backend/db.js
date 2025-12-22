const mongoose = require('mongoose');


const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
    }
}


module.exports = connectToMongo;
