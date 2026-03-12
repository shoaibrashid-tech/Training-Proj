import CartProductCard from "../components/CartProductCard";
import OrderSummary from "../components/OrderSummary";
import { useSelector } from "react-redux";
import { GrClear } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";

export default function CartPage() {
  const cart = useSelector((state) => state.cart.itemList)
  //console.log(cart)
  const dispatch = useDispatch();

  return (
    <section className="py-8 antialiased md:py-16">


      <div className="flex justify-center gap-10 max-w-7xl mx-auto">


        <div className="w-2/3">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-black sm:text-2xl">
              Shopping Cart
            </h2>
            <button
              onClick={()=>dispatch(clearCart())}
              className="inline-flex text-red-700 items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline"
            >
              Clear
              <GrClear />
            </button>

          </div>


          

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