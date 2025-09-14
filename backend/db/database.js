import mongoose from "mongoose";


async function connectDB(){
    try {
   await mongoose.connect(process.env.URL2);
   console.log("Database Connected Successfully");

    } catch (error) {
        console.log("Database Connection Error ");
        process.exit(1);
    }
}

export default connectDB;
