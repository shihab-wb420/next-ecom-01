// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from "../../models/Product"
import initMongoose from "../../libs/mongoose"
import ProductData from "../../libs/ProductData" 

export default async function handler(req, res) {
/* await initMongoose();
  try{
    let resp = await Product.create(ProductData);
   console.log(resp)
  res.status(200).json(resp)
  }catch(err){
    console.log(err)
  }*/
  
  res.status(200).json("server is running, hello")
}
