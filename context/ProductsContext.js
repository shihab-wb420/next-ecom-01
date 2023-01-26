import {createContext,useState} from "react"
import useLocalStorageState from "use-local-storage-state"

export const ProductsContext = createContext();

export function ProductsContextProvider({children}){
  const [cartProducts,setCartProducts] = useLocalStorageState("next-ecom_cart",{defaultValue:[]});
   
  // console.log("cartProducts",cartProducts)
   
  return( 
    <ProductsContext.Provider value={{cartProducts,setCartProducts}}>
     {children}
    </ProductsContext.Provider>
    )
}