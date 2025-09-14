import mongoose,{Schema} from "mongoose";


const users= new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

const userModel = mongoose.model("users",users)

export default userModel;