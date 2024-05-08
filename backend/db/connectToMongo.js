import mongoose from "mongoose";

const connectToMongo = () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("connected to MONGO");
  } catch (error) {
    console.log("error in db:", error);
  }
};

export default connectToMongo;
