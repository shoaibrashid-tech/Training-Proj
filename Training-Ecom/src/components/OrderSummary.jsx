import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PrimaryButton from "./utiliy-comp/PrimaryButton";
import { useNavigate } from "react-router-dom";

export default function OrderSummary() {

  const cartItems = useSelector((state) => state.cart.itemList);
  const navigate = useNavigate();
  // Subtotal
  const subtotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  // VAT (10%)
  const vat = subtotal * 0.10;

  // Shipping rule
  const shipping = subtotal < 150 && subtotal > 0 ? 10 : 0;

  // Final total
  const total = subtotal + vat + shipping;

  return (
    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">

      <div className="space-y-2 rounded-lg border border-gray-200 bg-white p-4 shadow-2xl shadow-black sm:p-6">
        <p className="text-xl font-bold text-black">
          Order summary
        </p>

        <div className="space-y-4">
          <div className="space-y-2">

            {/* Subtotal */}
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-black">
                Subtotal
              </dt>
              <dd className="text-base font-medium text-black">
                ${subtotal.toFixed(2)}
              </dd>
            </dl>

            {/* Shipping */}
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-black">
                Shipping
              </dt>
              <dd className="text-base font-medium text-black">
                ${shipping.toFixed(2)}
              </dd>
            </dl>

            {/* VAT */}
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-black">
                VAT (10%)
              </dt>
              <dd className="text-base font-medium text-black">
                ${vat.toFixed(2)}
              </dd>
            </dl>

          </div>

          {/* Total */}
          <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
            <dt className="text-base font-bold text-black">
              Total
            </dt>
            <dd className="text-base font-bold text-black">
              ${total.toFixed(2)}
            </dd>
          </dl>
        </div>

        <PrimaryButton buttonText={"Checkout"} onClickHandler={()=>{
          navigate("/checkout")
        }} />

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-gray-500">
            or
          </span>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 underline hover:no-underline"
          >
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
}