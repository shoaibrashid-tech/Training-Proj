import React, { useState } from "react";
import { useSelector } from "react-redux";
import ConfirmModal from "../components/Modals/ConfirmModal";

export default function CheckoutPage() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const cartItems = useSelector((state) => state.cart.itemList);
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

  const summary = [
    { label: "Subtotal", value: subtotal },
    { label: "Shipping", value: shipping },
    { label: "Tax-VAT", value: vat },
    { label: "Total", value: total, bold: true },
  ];


  return (
    <section className="bg-white py-8 md:py-16">

      <form className="mx-auto max-w-screen-xl px-4">

        <div className="mt-4 lg:flex lg:items-start lg:gap-12">

          {/* LEFT SIDE */}
          <div className="flex-1 space-y-8">

            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-4">

                <h2 className="text-2xl font-bold text-gray-900">
                  Delivery Details
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-lg border border-gray-300 p-2.5"
                  />

                  <input
                    type="text"
                    placeholder="Phone"
                    className="w-full rounded-lg border border-gray-300 p-2.5"
                  />

                  <input
                    type="text"
                    placeholder="Country"
                    className="w-full rounded-lg border border-gray-300 p-2.5"
                  />

                  <input
                    type="text"
                    placeholder="City"
                    className="w-full rounded-lg border border-gray-300 p-2.5"
                  />

                  <input
                    type="text"
                    placeholder="Address"
                    className="w-full rounded-lg border border-gray-300 p-2.5"
                  />

                  <input
                    type="text"
                    placeholder="Zip Code"
                    className="w-full rounded-lg border border-gray-300 p-2.5"
                  />

                </div>

               
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="mt-6 rounded-lg bg-indigo-600 px-6 py-2.5 text-white"
                >
                  Continue to Payment
                </button>

              </div>
            )}

            {/* STEP 2 */}

            {step === 2 && (
              <div className="space-y-4">

                <h2 className="text-2xl font-bold text-gray-900">
                  Payment Details
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  <input
                    type="text"
                    placeholder="Name on Card"
                    className="w-full rounded-lg border border-gray-300 p-2.5"
                  />

                  <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full rounded-lg border border-gray-300 p-2.5"
                  />

                  <input
                    type="text"
                    placeholder="Expiry (MM/YY)"
                    className="w-full rounded-lg border border-gray-300 p-2.5"
                  />

                  <input
                    type="text"
                    placeholder="CVV"
                    className="w-full rounded-lg border border-gray-300 p-2.5"
                  />

                </div>

                <div className="flex gap-4 pt-4">

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="rounded-lg border px-6 py-2.5"
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="rounded-lg bg-indigo-600 px-6 py-2.5 text-white"
                  >
                    Review Order
                  </button>

                </div>

              </div>
            )}

            {/* STEP 3 */}

            {open && (
              <ConfirmModal
                open={open}
                setOpen={setOpen}
                


              />
            )}

          </div>

          {/* RIGHT SIDE */}

          <div className="mt-8 w-full max-w-md space-y-6">

            <div className="border rounded-lg p-4">

              {summary.map((item, i) => (
                <div
                  key={i}
                  className={`flex justify-between py-2 ${
                    item.bold ? "font-bold text-gray-900" : "text-gray-500"
                  }`}
                >
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </div>
              ))}

            </div>

          </div>

        </div>

      </form>

    </section>
  );
}