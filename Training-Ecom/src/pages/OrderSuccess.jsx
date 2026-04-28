import React from "react";
import { Link } from "react-router-dom";
import LocalizedLink from "../components/utiliy-comp/LocalisedLink";

export default function OrderSuccess() {
  return (
    <section className="bg-white min-h-screen flex m-20 justify-center py-8 md:py-16">
      <div className="mx-auto max-w-2xl px-4 text-center">

        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Thanks for your order!
        </h2>

        <p className="text-gray-500 mb-6 md:mb-8">
          Your order{" "}
          <LocalizedLink
            to="/orders/7564804"
            className="font-medium text-blue-500 hover:underline"
          >
            #7564804
          </LocalizedLink>{" "}
          will be processed within 24 hours during working days. We will notify
          you by email once your order has been shipped.
        </p>

        <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-6 mb-6 md:mb-8 text-left">

          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="text-gray-500">Date</dt>
            <dd className="font-medium text-gray-900">14 May 2024</dd>
          </dl>

          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="text-gray-500">Payment Method</dt>
            <dd className="font-medium text-gray-900">
              JPMorgan monthly installments
            </dd>
          </dl>

          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="text-gray-500">Name</dt>
            <dd className="font-medium text-gray-900">
              Flowbite Studios LLC
            </dd>
          </dl>

          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="text-gray-500">Address</dt>
            <dd className="font-medium text-gray-900">
              34 Scott Street, San Francisco, California, USA
            </dd>
          </dl>

          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="text-gray-500">Phone</dt>
            <dd className="font-medium text-gray-900">
              +(123) 456 7890
            </dd>
          </dl>

        </div>

        <div className="flex items-center justify-center gap-4 flex-wrap">

          <LocalizedLink
            to="/"
            className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Track your order
          </LocalizedLink>

          <LocalizedLink
            to="/"
            className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100"
          >
            Return to shopping
          </LocalizedLink>

        </div>

      </div>
    </section>
  );
}