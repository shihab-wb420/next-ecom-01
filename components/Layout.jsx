import {useState} from "react"
import BottomNav from "./BottomNav"


const Layout = ({children}) =>{
  
  return(
    <div>
      <div className="p-5">
        {children}
      </div>
      <BottomNav />
   </div>
  );
}

export default Layout