const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('Connecting to MongoDB...');
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

// Gracefully handle termination signals
process.on('SIGINT', async () => {
    console.log('Closing database connection due to app termination');
    await mongoose.connection.close();
    process.exit(0);
});

module.exports = connectDB;
