import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}`
    );
    console.log(
      "Mongo DB is connected 🎉 \nHostname",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.log("Failed to connect with database: ", error);
    process.exit(1);
  }
};

export default connectDB;
