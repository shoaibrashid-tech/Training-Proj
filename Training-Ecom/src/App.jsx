import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ProductCard from './components/ProductCard'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [products, setProduct] = useState([]);
  async function GetPoducts(){
      const product = await fetch('https://fakestoreapi.com/products');
      
      return product.json();
  }
  function retreiveProduct(){
      const product = localStorage.getItem("Product");
      if(!product) return false;
      return JSON.parse(product);
  }
  useEffect(()=>{
    let data = retreiveProduct();
    if(!data){
      GetPoducts().then(
          response => {
              console.log("Fetched Data:")
              console.log(response)
              const arr = [];
              setProduct(response)
              localStorage.setItem("Product", JSON.stringify(response));
              
          }
      ).catch(
          error => {console.error(error);}
      );
    }else{
      setProduct(data);
    }
  }, [])
  return (

    <div>
      <div className='flex justify-center m-8'>
        <h1 className=' text-5xl font-bold'>Product Page</h1>
      </div>
      
      <div className='flex justify-center'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4'>
          {
            products.map((product, index) => (
              <div key={index} className="" > 
                <ProductCard product={product} />
              </div>

            ))
          }
        </div>
      </div>
    </div>
    
  )
}

export default App
