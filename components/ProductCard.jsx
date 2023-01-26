import Image from "next/image"
import {useContext} from "react";
import {ProductsContext} from "../context/ProductsContext";

const ProdactCard = ({_id,name,price,picture, description,})=>{
  
  const {setCartProducts} = useContext(ProductsContext);
  
  //saving cart-products to localStorage
  const addProduct=(id)=>{
    setCartProducts(prev => [...prev,_id])
  }
  
  return(
     <div className="w-[200px]">
       <div className="bg-blue-100 p-1 rounded-md">
         <img className="w-[100%] h-[150px]" src={picture} alt="..."/>
       </div>
       <div className="mt-2"> 
         <h3 className="font-bold text-lg "> {name.slice(0,15)} </h3>
       </div>
       <p className="text-sm mt-1 leading-4 text-gray-500">{description.slice(0,50)}</p>
       <div className="flex mt-1">
         <div className="text-xl font-bold grow">${price}</div>
         <button onClick={()=>addProduct(_id)} className="bg-emerald-400 text-white text-md px-2 rounded-md"> Add to cart</button>
       </div>
     </div>
    )
}

export default ProdactCard