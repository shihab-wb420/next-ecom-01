import {model,models,Schema} from "mongoose"

const productSchema = new Schema({
  name:String,
  description:String,
  price:Number,
  category:String,
  picture:String
},{ timestamps : true});

const Product = models?.Product || model("Product",productSchema);

export default Product