import mongoose from "mongoose"

const ordersSchema = new mongoose.Schema({
user:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"user"
},
name:{
  type:String,
  require:true,
}, 
email:{
  type:String,
  require:true,
},
address:{
  type:String,
  require:true,
},
phone:{
  type:Number,
  require:true,
},
zip:{
  type:String,
  require:true,
},
city:{
  type:String,
  require:true,
},
product:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"products",
}

},
{timestamps:true},
)

const orders = mongoose.model("orders",ordersSchema)
export default orders

