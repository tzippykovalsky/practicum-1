import mongoose from "mongoose";

export const connectToDB = async () => {
    try {
        let connect = await mongoose.connect("mongodb://0.0.0.0:27017/parcticum")
        console.log("mongo db connected")
    }
    catch (err) {
        console.log(err);
        console.log("cannot connect to db");
        process.exit(1)
    }
}
