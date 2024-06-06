import mongoose from "mongoose"

const productsSchema = new mongoose.Schema({
user:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"user"
},
name:{
  type:String,
  require:true,
}, 
category:{
  type:String,
  require:true,
},
brand:{
  type:String,
  require:true,
},
price:{
  type:Number,
  require:true,
},
stock:{
  type:Number,
  require:true,
},
image:{
  type:String,
  require:true,
},
description:{
  type:String,
  require:true,
},
desDtl:{
  type:String,
  require:true,
}

},
{timestamps:true},
)



const products = mongoose.model('products',productsSchema)
export default products