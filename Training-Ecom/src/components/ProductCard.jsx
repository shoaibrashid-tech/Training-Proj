import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import SecondaryButton from './utiliy-comp/SecondaryButton';
import PrimaryButton from './utiliy-comp/PrimaryButton';
import { useLocale } from '../Utils/LocaleContext'; 
import { formatCurrency, exchangeRates } from '../Utils/currencyFormater';

function ProductCard({ product }) {
    const navigate = useNavigate();
    const { currency, locale } = useLocale();

    return (
        <div className='h-[31.5rem] w-full bg-white rounded-lg shadow-sm shadow-grey-500'>
            <div className='w-full h-1/2 px-4 pt-4'>
                <img 
                    src={product.images[0]} alt={product.title} 
                    className='w-full h-full object-cover rounded-sm shadow-sm shadow-500'
                />
            </div>
            <div className='w-full h-1/2 px-4 py-2 text-black '>
                <div className='h-1/4 '>
                    <div className='w-full'>
                        <div className='h-full line-clamp-2'> 
                            <h1 className=' font-bold object-cover pt-2 pr-1'>{product.title}</h1>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-end px-4 py-0'>
                    <h1 className='text-2xl font-bold'>
                        {formatCurrency((Number(product.price) * exchangeRates[currency]), currency, locale)}
                    </h1>
                </div>
                <div className='h-1/2'>
                    <hr className="h-1 bg-neutral-quaternary"></hr>
                    <p className='my-4 px-2 line-clamp-3 text-sm'>
                        {product.description}
                    </p>
                    <PrimaryButton 
                        buttonText={"Buy Now"} 
                        onClickHandler={() => navigate(`/product/${product.id}`)} 
                    />
                </div>
            </div>
        </div>
    )
}

export default memo(ProductCard);