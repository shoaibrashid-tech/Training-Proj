import React from 'react'
import SecondaryButton from './utiliy-comp/SecondaryButton'
import PrimaryButton from './utiliy-comp/PrimaryButton'
function ProductCard({product}) {


  return (
    <div className= 'h-126 w-88 bg-white rounded-lg shadow-2xl shadow-black' >

        <div className='w-full h-1/2 px-4 pt-4'>
            <img 
                    src={product.images[0]} alt='Sneaker Black' 
                    className='w-full h-full object-cover rounded-sm shadow-sm shadow-500'
                />
        </div>
        <div className='w-full h-1/2 px-4 py-2 text-black '>
            <div className='h-1/4 '>
                <div className='w-full'>
                    <div className='h-full line-clamp-2'> 
                        <href>
                            <h1 className=' font-bold object-cover pt-2 pr-1'>{product.title}</h1>
                        </href>
                           
                    </div>
                        
                    
                </div>
                
            </div>
            <div className='flex flex-col items-end px-4 py-0'>
                <h1 className=' text-2xl font-bold'>$ {product.price}</h1>
            </div>
            <div className='h-1/2'>
                <hr class="h-1 bg-neutral-quaternary"></hr>
                <p className='my-4 px-2 line-clamp-3 text-sm'>
                    {product.description}
                </p>
                <PrimaryButton buttonText={"Buy Now"} />
            </div>
        </div>

    </div>
  )
}

export default ProductCard