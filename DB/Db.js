import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const dbUrl = await mongoose.connect(process.env.dbUrl);
    console.log("Db Connected Successfully.. ");
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
