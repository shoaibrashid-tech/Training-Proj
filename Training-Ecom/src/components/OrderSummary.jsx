import PrimaryButton from "./utiliy-comp/PrimaryButton";

export default function OrderSummary() {
  return (
    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">

      {/* Order Summary */}
      <div className="space-y-2 rounded-lg border border-gray-200 bg-white p-4 shadow-2xl shadow-black  sm:p-6">
        <p className="text-xl font-bold text-black">
          Order summary
        </p>

        <div className="space-y-4">
          <div className="space-y-2">

            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-black">
                Original price
              </dt>
              <dd className="text-base font-medium text-black">
                $7,592.00
              </dd>
            </dl>


            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-black ">
                Store Pickup
              </dt>
              <dd className="text-base font-medium text-black">
                $99
              </dd>
            </dl>

            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-black">
                Tax
              </dt>
              <dd className="text-base font-medium text-black">
                $799
              </dd>
            </dl>

          </div>

          <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
            <dt className="text-base font-bold text-black">
              Total
            </dt>
            <dd className="text-base font-bold text-white">
              $8,191.00
            </dd>
          </dl>
        </div>

        <PrimaryButton buttonText={"Checkout"} />

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-gray-500">
            or
          </span>

          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline"
          >
            Continue Shopping

            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 12H5m14 0-4 4m4-4-4-4"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}