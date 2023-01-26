//import styles from '../styles/Home.module.css'
import {findAllProducts} from "./api/products"
import initiMongoose from "../libs/mongoose"
import ProductCard from "../components/ProductCard"

export default function Home({products}) {
  
  const categoriesName = [...new Set(products.map(p=>p.category))]
  
 // console.log(products)
 
  return (
    <div className="">
      <div className="">
        {
          categoriesName.map(categoryName=>(
           <div key={categoryName}>
             {
               products.find( p => p.category === categoryName) && (
                <div>
                  <h2 className="text-xl -mx-2 my-5 capitalize">
                    {categoryName}
                  </h2>
                  <div className="flex -mx-2  overflow-x-auto snap-x snap-mandatory flex-nowrap gap-5 scrollbar-hide">
                    {
                      products.filter( p=> p.category === categoryName).map( productInfo => (
                         <div className="snap-start" key={productInfo._id}>
                           <ProductCard {...productInfo}/>
                         </div>
                      ))
                    }
                  </div>
                </div>
               )
             }
           </div>
          ))
        }
      </div>
        
    </div>
  )
}

export async function getServerSideProps(){
  await initiMongoose();
  const products = await findAllProducts();
  return{
    props:{
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}