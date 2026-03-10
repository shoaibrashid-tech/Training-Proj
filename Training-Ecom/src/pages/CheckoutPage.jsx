import React, { useState } from "react";
import { useSelector } from "react-redux";
import ConfirmModal from "../components/Modals/ConfirmModal";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from "../Utils/CheckoutValidationSchema";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";

export default function CheckoutPage() {

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange"
  });

  const nextStep = async () => {
    const valid = await trigger([
      "email",
      "phone",
      "city",
      "address",
      "zipCode",
    ]);

    if (valid) setStep(2);
  };

  const onSubmit = (data) => {
    console.log("Checkout data:", data);
    setOpen(true);
  };

  const handleConfirmPayment = () => {
    console.log("Payment confirmed");

    dispatch(clearCart()); // empty cart
    setOpen(false);

    navigate("/order-success");
  };

  const cartItems = useSelector((state) => state.cart.itemList);

  const subtotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const vat = subtotal * 0.10;

  const shipping = subtotal < 150 && subtotal > 0 ? 10 : 0;

  const total = subtotal + vat + shipping;

  const summary = [
    { label: "Subtotal", value: subtotal },
    { label: "Shipping", value: shipping },
    { label: "Tax-VAT", value: vat },
    { label: "Total", value: total, bold: true },
  ];

  return (
    <section className="bg-white py-8 md:py-16">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-screen-xl px-4"
      >

        <div className="mt-4 lg:flex lg:items-start lg:gap-12">

          <div className="flex-1 space-y-8">

            {/* STEP 1 */}

            {step === 1 && (
              <div className="space-y-4">

                <h2 className="text-2xl font-bold text-gray-900">
                  Delivery Details
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      {...register("email")}
                      className="w-full rounded-lg border border-gray-300 p-2.5"
                    />
                    {errors.email && (
                      <p className="text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Phone"
                      {...register("phone")}
                      className="w-full rounded-lg border border-gray-300 p-2.5"
                    />
                    {errors.phone && (
                      <p className="text-red-500">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="City"
                      {...register("city")}
                      className="w-full rounded-lg border border-gray-300 p-2.5"
                    />
                    {errors.city && (
                      <p className="text-red-500">{errors.city.message}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="State"
                      {...register("state")}
                      className="w-full rounded-lg border border-gray-300 p-2.5"
                    />
                    {errors.state && (
                      <p className="text-red-500">{errors.state.message}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      placeholder="Address"
                      {...register("address")}
                      className="w-full rounded-lg border border-gray-300 p-2.5"
                    />
                    {errors.address && (
                      <p className="text-red-500">{errors.address.message}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Zip Code"
                      {...register("zipCode")}
                      className="w-full rounded-lg border border-gray-300 p-2.5"
                    />
                    {errors.zipCode && (
                      <p className="text-red-500">{errors.zipCode.message}</p>
                    )}
                  </div>

                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  className="mt-6 rounded-lg bg-blue-500 px-6 py-2.5 text-white"
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

                  <div>
                    <input
                      type="text"
                      placeholder="Name on Card"
                      {...register("cardName")}
                      className="w-full rounded-lg border border-gray-300 p-2.5"
                    />
                    {errors.cardName && (
                      <p className="text-red-500">{errors.cardName.message}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Card Number"
                      {...register("cardNumber")}
                      className="w-full rounded-lg border border-gray-300 p-2.5"
                    />
                    {errors.cardNumber && (
                      <p className="text-red-500">{errors.cardNumber.message}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Expiry (MM/YY)"
                      {...register("expiry")}
                      className="w-full rounded-lg border border-gray-300 p-2.5"
                    />
                    {errors.expiry && (
                      <p className="text-red-500">{errors.expiry.message}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="CVV"
                      {...register("cvv")}
                      className="w-full rounded-lg border border-gray-300 p-2.5"
                    />
                    {errors.cvv && (
                      <p className="text-red-500">{errors.cvv.message}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      placeholder="Billing Address"
                      {...register("billingAddress")}
                      className="w-full rounded-lg border border-gray-300 p-2.5"
                    />
                    {errors.billingAddress && (
                      <p className="text-red-500">{errors.billingAddress.message}</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Billing Zip"
                      {...register("billingZip")}
                      className="w-full rounded-lg border border-gray-300 p-2.5"
                    />
                    {errors.billingZip && (
                      <p className="text-red-500">{errors.billingZip.message}</p>
                    )}
                  </div>

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
                    type="submit"
                    className="rounded-lg bg-blue-500 px-6 py-2.5 text-white"
                  >
                    Review Order
                  </button>

                </div>

              </div>
            )}

            {open && (
              <ConfirmModal
                open={open}
                setOpen={setOpen}
                title={"Confirm Payment"}
                description={"Are you sure you want to continue with the payment"}
                onConfirm={onConfirm={handleConfirmPayment}}
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