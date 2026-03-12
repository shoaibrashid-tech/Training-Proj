import CartProductCard from "../components/CartProductCard";
import OrderSummary from "../components/OrderSummary";
import { useSelector, useDispatch } from "react-redux";
import { GrClear } from "react-icons/gr";
import { clearCart } from "../features/cart/cartSlice";

export default function CartPage() {
  const cart = useSelector((state) => state.cart.itemList);
  const dispatch = useDispatch();

  return (
    <section className="py-8 antialiased h-full md:py-16 px-4">
      <div className="flex flex-col lg:flex-row gap-10 max-w-7xl mx-auto h-[85vh] lg:h-auto">
        
        
        <div className="w-full lg:w-1/3 order-1 lg:order-2 shrink-0">
          <OrderSummary cart={cart} />
        </div>

        {/* PRODUCTS LIST: Scrollable area */}
        <div className="w-full lg:w-full order-2 lg:order-1 overflow-y-auto pr-2 pb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-black sm:text-2xl">
              Shopping Cart
            </h2>
            <button
              onClick={() => dispatch(clearCart())}
              className="inline-flex text-red-700 items-center gap-2 text-sm font-medium hover:underline"
            >
              Clear
              <GrClear />
            </button>
          </div>

          <div className="space-y-6">
            {cart.length > 0 ? (
              cart.map((item) => (
                <CartProductCard key={item.id} item={item} />
              ))
            ) : (
              <p className="text-gray-500">Your cart is empty.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}