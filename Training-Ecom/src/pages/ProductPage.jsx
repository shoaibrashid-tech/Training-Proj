import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/20/solid'
import Loading from '../components/Loading';
import PrimaryButton from '../components/utiliy-comp/PrimaryButton';

export default function ProductPage() {
    const {id} = useParams();
    const [product, setProduct] = useState();
    const reviews = { href: '#', average: 4, totalCount: 117 }
    const imageClasses = [
    "row-span-2 aspect-4/5 size-full object-cover sm:rounded-lg lg:aspect-3/4",
    "row-span-2 aspect-3/4 size-full rounded-lg object-cover max-lg:hidden",
    "col-start-2 aspect-3/2 size-full rounded-lg object-cover max-lg:hidden",
    "col-start-2 row-start-2 aspect-3/2 size-full rounded-lg object-cover max-lg:hidden",
    
    ];
    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingProduct = cart.find((item) => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
            ...product,
            quantity: 1,
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Product added to cart");
    };
    function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
    }
    const FetchData = async ()=>{
        try{
            const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
            if(!response.ok){
                throw new Error(`Https Response: ${response.status}`)
            }
            const responseData = await response.json();
            setProduct(responseData);
        } catch (error){
            console.error(error.message)
        }
    };

    useEffect(()=>{
        

        FetchData();
        
        }, [])

        if(!product){
            return (
            <div className='w-full h-screen flex justify-center items-center p-1/2'>
              <Loading />
            </div>
          );
        }
  return (
     <div className="bg-white">
      <div className="pt-6">
        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-8 lg:px-8">
            {product.images?.slice(0,4).map((img, index) => (
                <img
                key={index}
                src={img}
                alt={product.title}
                className={imageClasses[index]}
                />
            ))}
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.title}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">Price: ${product.price}</p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(
                        reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                        'size-5 shrink-0',
                      )}
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>

           <div className='mt-10'>
                <PrimaryButton buttonText={"Add to Cart"} onClickHandler={addToCart} />
           </div>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">blh blah blah</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
