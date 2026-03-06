import React from 'react'

export default function CartProductCard({item}) {
    
  return (
            <div
              key={item.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-2xl shadow-black md:p-6"
            >
              <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">

                {/* Image */}
                <a href="#" className="shrink-0 md:order-1">
                  <img
                    className="h-20 w-20 object-cover"
                    src={item.images?.[0]}
                    alt={item.title}
                  />
                </a>

                {/* Quantity */}
                <div className="flex items-center justify-between md:order-3 md:justify-end">
                  <div className="flex items-center">

                    <button
                      className="inline-flex h-5 w-5 items-center justify-center rounded-md border bg-gray-100"
                    >
                      -
                    </button>

                    <span className="mx-2 text-sm font-medium text-black">
                      {item.quantity}
                    </span>

                    <button
                      className="inline-flex h-5 w-5 items-center justify-center rounded-md border bg-gray-100"
                    >
                      +
                    </button>

                  </div>

                  <div className="ml-6 text-end md:w-32">
                    <p className="text-2xl font-bold text-black ">
                      ${item.price * item.quantity}
                    </p>
                  </div>
                </div>

                {/* Title */}
                <div className="w-full min-w-0 flex-1 space-y-2 md:order-2 md:max-w-md">
                  <p className="text-xl font-bold text-black ">
                    {item.title}
                  </p>

                  <button className="text-md underline font-bold text-red-700">
                    Remove
                  </button>
                </div>

              </div>
            </div>
  )
}
