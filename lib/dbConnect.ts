import mongoose from "mongoose";

let isConnected = false; // track the connection

export const connectMongoDb = async () => {
 mongoose.set("strictQuery", true);

 if (isConnected) {
  console.log("MongoDB is already connected");
  return;
 }

 try {
  // @ts-ignore
  await mongoose.connect(process.env.MONGODB_URI, {
   dbName: "doc-time",
   useNewUrlParser: true,
   useUnifiedTopology: true,
  });

  isConnected = true;

  console.log("MongoDB connected.");
 } catch (error) {
  console.log(error);
 }
};
