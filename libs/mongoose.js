import mongoose from "mongoose"

export default function initMongoose(){
  if(mongoose.connection.readyState === 1){
     return mongoose.connection.asPromise();
  }
  
  return mongoose.connect(process.env.MONGO_URL);
}