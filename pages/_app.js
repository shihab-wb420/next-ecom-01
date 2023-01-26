import '../styles/globals.css'
import { ProductsContextProvider} from "../context/ProductsContext"
import Layout from "../components/Layout"


function MyApp({ Component, pageProps }) {
  return(
    <ProductsContextProvider>
      <Layout>
       <Component {...pageProps} />
      </Layout>
    </ProductsContextProvider>
    )
}

export default MyApp
