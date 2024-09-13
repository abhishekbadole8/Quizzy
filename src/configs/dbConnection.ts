import mongoose from "mongoose";

const connectDb = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGOOSE_CONNECTION;

    if (!mongoURI) {
      throw new Error(
        "MongoDB connection string is not defined in environment variables"
      );
    }
    await mongoose.connect(mongoURI);

    console.log("Database connection successful");
  } catch (error) {
    console.error(`Database connection failed: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDb;
