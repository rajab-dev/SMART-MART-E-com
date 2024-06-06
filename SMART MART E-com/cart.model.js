import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
user:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"user"
},
product:{
type:mongoose.Schema.Types.ObjectId,
ref:"products",
}, 

},
{timestamps:true},
)



const cart = mongoose.model('cart',cartSchema)
export default cart;