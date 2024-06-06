import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
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
message:{
  type:String,
  require:true,
},

},
{timestamps:true},
)

const message = mongoose.model('message',messageSchema)
export default message