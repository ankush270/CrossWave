import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    // console.log(process.env.MONGODB_URI);
    
    const connectionInstance = await mongoose.connect(
       `${process.env.MONGODB_URI}/${process.env.MONGO_DB_NAME}`
    );
    console.log(
       `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB connection failed", error);
    process.exit(1);
  }
};

export default connectMongoDB;
