const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_ATLAS_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log(`MongoDB connected: ${conn.connection.host}`)
    }
    catch(err) {
        console.log("Error:" + err );
        process.exit(1)
    }
}

module.exports = connectDB;