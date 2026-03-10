import React from 'react'
import BrandLogos from './utiliy-comp/BrandLogos'
import { Link } from 'react-router-dom'

export default function MainPageHeroSection() {
    return (
        <section className="bg-white flex flex-col antialiased h-screen ">
            <div className="mx-auto grid max-w-screen-xl flex h-8/12  justify-center items-center px-4 pb-8 md:grid-cols-12 lg:gap-12 lg:pb-16 xl:gap-0 ">

                <div className="content-center justify-self-start md:col-span-7 md:text-start">
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:max-w-2xl md:text-5xl xl:text-6xl">
                        Limited Time Offer!
                        <br />
                        Up to 50% OFF!
                    </h1>

                    <p className="mb-4 max-w-2xl text-gray-500 md:mb-12 md:text-lg lg:mb-5 lg:text-xl">
                        Don't Wait - Limited Stock at Unbeatable Prices!
                    </p>

`                   <Link
                    href="#"
                    className="inline-block rounded-lg bg-blue-500 px-6 py-3.5 text-center font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                        Shop Now
                    </Link>`
                </div>

                <div className="hidden md:col-span-5 md:mt-0 md:flex">
                    <img
                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/girl-shopping-list.svg"
                        alt="shopping illustration"
                    />
                </div>

            </div>
            <div className='h-4/12'>
                <BrandLogos />
            </div>

        </section>
    )
}
