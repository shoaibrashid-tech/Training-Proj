import React from 'react'

function PrimaryButton({buttonText, onClickHandler}) {
  return (
    <button onClick={onClickHandler} className='flex items-center justify-center w-full h-10 border-2 hover:border-blue-500 border-white hover:bg-white bg-blue-500 rounded-sm hover:text-blue-500 text-white'>

        <h1 className=' font-Bold text-md'>{buttonText}</h1>

    </button>
  )
}

export default PrimaryButton