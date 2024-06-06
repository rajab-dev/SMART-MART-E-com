import mongoose from 'mongoose';
try {
  mongoose.connect("mongodb://127.0.0.1:27017/Basic_form_single_vendor")
  console.log("database connected")
} catch (error) {
  console.log(error)
}

const userSchema = new mongoose.Schema({
    username:{
      type:  String,
    unique:true,
    require:true,
    },
    password:{
      type:String,
      require:true,
    },
    fullname:String,
    products:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"products"
    }],
    orders:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"orders",
    }],
    receivedOrder:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"orders",
    }],
    cart:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"cart",
    }],
    message:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"message",
    }],
},{timestamps:true})

 const user=mongoose.model("user",userSchema)
 export default user
