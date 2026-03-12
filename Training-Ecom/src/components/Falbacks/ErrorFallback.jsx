import React from 'react'
import "../../css/Scrolbar.css"

export default function ErrorFallback({error, resetErrorBoundary}) {
  console.log(error);
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
  <div className="max-w-lg w-full text-center">

    {/* Icon */}
    <div className="flex justify-center mb-6">
      <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
        <svg
          className="w-10 h-10 text-blue-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 4h.01M10.29 3.86l-7.3 12.65A1 1 0 003.87 18h16.26a1 1 0 00.88-1.49l-7.3-12.65a1 1 0 00-1.72 0z" />
        </svg>
      </div>
    </div>

    {/* Heading */}
    <h1 className="text-3xl font-bold text-black mb-4">
      Something went wrong
    </h1>

    {/* Description */}
    <p className="text-gray-600 mb-8">
      We encountered an unexpected error while loading this page.  
      Please try reloading the page.
    </p>
    <div className='flex flex-col mb-5'>
      <div className="flex items-center gap-2 p-4 bg-blue-500 rounded-tr-2xl rounded-tl-2xl">
        <h1 className=' text-xl font-bold'>{error.name}: </h1>
        <p className=' text-md font-light'>{error.message}</p>
      </div>  
      <div className="max-h-52 overflow-y-auto p-4 bg-gray-200 border-2 border-t-0 border-black rounded-bl-2xl text-left text-sm font-mono custom-scrollbar">
        <pre className="whitespace-pre-wrap">{error.stack}</pre>
      </div>
      
    </div>
      
    

    {/* Reload Button */}
    <button
      onClick={resetErrorBoundary}
      className="inline-flex items-center justify-center px-6 py-3 rounded-lg
                 bg-blue-600 text-white font-medium
                 hover:bg-blue-700 transition
                 shadow-md"
    >
      Reload Page
    </button>

    {/* Subtle footer text */}
    <p className="text-gray-400 text-sm mt-8">
      If the problem persists, please try again later.
    </p>

  </div>
</div>
  )
}
