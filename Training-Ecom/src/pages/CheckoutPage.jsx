import React from "react";

export default function CheckoutPage() {

  const steps = ["Cart", "Checkout", "Order summary"];

  const paymentMethods = [
    {
      id: "credit-card",
      title: "Credit Card",
      desc: "Pay with your credit card",
      checked: true,
    },
    {
      id: "pay-delivery",
      title: "Payment on delivery",
      desc: "+$15 payment processing fee",
    },
    {
      id: "paypal",
      title: "Paypal account",
      desc: "Connect to your account",
    },
  ];

  const deliveryMethods = [
    {
      id: "dhl",
      title: "$15 - DHL Fast Delivery",
      desc: "Get it by tomorrow",
      checked: true,
    },
    {
      id: "fedex",
      title: "Free Delivery - FedEx",
      desc: "Get it by Friday",
    },
    {
      id: "express",
      title: "$49 - Express Delivery",
      desc: "Get it today",
    },
  ];

  const summary = [
    { label: "Subtotal", value: "$8,094.00" },
    { label: "Savings", value: "$0" },
    { label: "Store Pickup", value: "$99" },
    { label: "Tax", value: "$199" },
    { label: "Total", value: "$8,392.00", bold: true },
  ];

  return (
    <section className="bg-white py-8 md:py-16">
      <form className="mx-auto max-w-screen-xl px-4">
        <div className="mt-4 lg:flex lg:items-start lg:gap-12">

          {/* LEFT SIDE */}
          <div className="flex-1 space-y-8">

            {/* Delivery Details */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Delivery Details
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full rounded-lg border border-gray-300 p-2.5"
                />

                <input
                  type="email"
                  placeholder="Email"
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
                  placeholder="Phone"
                  className="w-full rounded-lg border border-gray-300 p-2.5"
                />

                <input
                  type="text"
                  placeholder="Company"
                  className="w-full rounded-lg border border-gray-300 p-2.5"
                />

              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Payment
              </h3>

              <div className="grid md:grid-cols-3 gap-4">

                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                  >
                    <label className="flex items-start gap-3">

                      <input
                        type="radio"
                        name="payment"
                        defaultChecked={method.checked}
                      />

                      <div>
                        <p className="font-medium text-gray-900">
                          {method.title}
                        </p>

                        <p className="text-xs text-gray-500">
                          {method.desc}
                        </p>
                      </div>

                    </label>
                  </div>
                ))}

              </div>
            </div>

            {/* Delivery Methods */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Delivery Methods
              </h3>

              <div className="grid md:grid-cols-3 gap-4">

                {deliveryMethods.map((method) => (
                  <div
                    key={method.id}
                    className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                  >
                    <label className="flex items-start gap-3">

                      <input
                        type="radio"
                        name="delivery"
                        defaultChecked={method.checked}
                      />

                      <div>
                        <p className="font-medium text-gray-900">
                          {method.title}
                        </p>

                        <p className="text-xs text-gray-500">
                          {method.desc}
                        </p>
                      </div>

                    </label>
                  </div>
                ))}

              </div>
            </div>

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

            <button
              className="w-full rounded-lg bg-indigo-600 py-2.5 text-white font-medium hover:bg-indigo-700"
            >
              Proceed to Payment
            </button>

          </div>

        </div>
      </form>
    </section>
  );
}