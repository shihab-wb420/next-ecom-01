import {useContext, useState,useEffect  } from "react"
import {ProductsContext } from "../context/ProductsContext"
import axios from "axios"


const Checkout = ()=>{
  const {cartProducts} = useContext(ProductsContext)
  const [cartProductsInfo,setCartProductsInfo] = useState([])
  const [address,setAddress] = useState('');
  const [city,setCity] = useState('');
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  
  console.log("cartProducts from localStorage: ",cartProducts)
   
  const getCartProductsInfo = async()=>{
  try{
    if(cartProducts){
     const uniqueIds = [...new Set(cartProducts)]
      console.log("uniqueIds: ",uniqueIds)
      let {data} = await axios.get(`/api/products?ids=${uniqueIds.join(",")}`);
      setCartProductsInfo(data)
      console.log("axios: api data: ",data)
    }
   }catch(err){
     console.log("Checkout page:- ",err)
   }
  }
  
  useEffect(()=>{
    getCartProductsInfo()
  },[cartProducts])
  console.log("cartprod", cartProductsInfo) 
    
  //decrease product quantity 
  const lessOfThisProduct =()=>{
    
  }
  // increase product quantity 
  const moreOfThisProduct = () =>{
    
  }
  
  //cart price calculation 
  const deliveryPrice = 5;
  let subtotal = 0;
  if (cartProducts?.length) {
    try{
     for (let id of cartProducts) {
       const price = cartProductsInfo?.find(p => p._id === id)?.price || 0;
       subtotal += price;
     }
   }catch(err){
      console.log("subtotal error:",err)
  }
 }
  
  const total = subtotal + deliveryPrice;
  
  return(
     <div>
       {!cartProductsInfo && (
       <div>No products in your cart...</div>
       )}
       {
         cartProductsInfo.length && cartProductsInfo.map(productInfo=>{
           const amount = cartProducts.filter(id => id === productInfo._id).length;
           if(amount === 0) return;
          
          return(
            <div className="flex mb-5 items-center justify-around" key={productInfo._id}>
             <div className="flex items-center">
               <div className="bg-gray-100 p-2 rounded-xl shrink-0" style={{boxShadow:'inset 1px 0px 10px 10px rgba(0,0,0,0.1)'}}>
                  <img className="w-20" src={productInfo.picture} alt=""/>
                </div>
                <div className="pl-2 items-center">
                  <h3 className="font-bold text-md">{productInfo.name.slice(0,19)}</h3>
                  <p className="text-sm leading-4 text-gray-500">{productInfo.description.slice(0,22)}...</p>
                </div>
              </div>
              <div className="ml-2 flex-end"> 
                <div className="grow font-bold">${productInfo.price}</div>
                <button onClick={() => lessOfThisProduct(productInfo._id)} className="border border-emerald-500 px-2 rounded-lg text-emerald-500">-</button>
                <span className="px-2">
                  {cartProducts.filter(id => id === productInfo._id).length}
                </span>
                <button onClick={() => moreOfThisProduct(productInfo._id)} className="bg-emerald-500 px-2 rounded-lg text-white">+</button>
              </div>
            </div>
          );
         })
       }
       
       <form action="/api/checkout" method="POST">
         <div className="mt-8">
          <input name="name" value={name} onChange={e => setName(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="Your name"/>
          <input name="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="email" placeholder="Email address"/>
          <input name="address" value={address} onChange={e => setAddress(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="Your Address"/>
          <input name="city" value={city} onChange={e => setCity(e.target.value)} className="bg-gray-100 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="City and postal code"/>
         </div>
         <div className="mt-8">
           <div className="flex my-3">
             <h3 className="grow font-bold text-gray-400">Subtotal:</h3>
             <h3 className="font-bold">${subtotal}</h3>
           </div>
           <div className="flex my-3">
             <h3 className="grow font-bold text-gray-400">Delivery:</h3>
             <h3 className="font-bold">${deliveryPrice}</h3>
           </div>
           <div className="flex my-3 border-t pt-3 border-dashed border-emerald-500">
             <h3 className="grow font-bold text-gray-400">Total:</h3>
             <h3 className="font-bold">${total}</h3>
           </div>
         </div>
         <input type="hidden" name="products" value={cartProducts.join(',')}/>
         <button type="submit" className="bg-emerald-500 px-5 py-2 rounded-xl font-bold text-white w-full my-4 shadow-emerald-300 shadow-lg">
           Pay ${total}
         </button>
       </form>
      
      
     </div>
 );
}

export default Checkout 
