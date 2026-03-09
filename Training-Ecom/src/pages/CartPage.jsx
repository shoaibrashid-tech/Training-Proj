import React, { useEffect, useState } from "react";
import CartProductCard from "../components/CartProductCard";
import OrderSummary from "../components/OrderSummary";
import { useSelector } from "react-redux";

export default function CartPage() {
  const cart = useSelector((state) => state.cart.itemList)
  console.log(cart)


  return (
    <section className="py-8 antialiased md:py-16">


      <div className="flex justify-center gap-10 max-w-7xl mx-auto">


        <div className="w-2/3">
          <h2 className="text-xl font-semibold text-black sm:text-2xl">
            Shopping Cart
          </h2>

          <div className="mt-6 space-y-6">
            {cart.map((item) => (
              <CartProductCard key={item.id} item={item} />
            ))}
          </div>
        </div>


        <div className="w-1/3 sticky top-48 h-fit">
          <OrderSummary cart={cart} />
        </div>

      </div>
    </section>
  );
}