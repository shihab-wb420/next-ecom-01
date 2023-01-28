import Product from "../../models/Product"
import initMongoose from "../../libs/mongoose"

export async function findAllProducts(){
  return Product.find().exec();
}

export default async function handle(req,res){
 try{
  await initMongoose();
  const {ids} = req.query;
  if(ids){
    const idsArray = ids.split(",");
    console.log("split",idsArray)
    res.json( 
      await Product.find({
      '_id':{$in:idsArray}
    }).exec()
    );
  }else{
    res.json(await findAllProducts);
  }
 }catch(err){
   console.log("products api error",err)
 }
}

