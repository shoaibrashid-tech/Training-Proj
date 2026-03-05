import React from 'react'

export default function SpecialButton({buttonText, onClickHandler}) {
  return (
    <button onClick={onClickHandler} className='flex items-center justify-center w-full h-full object-contain hover:bg-blue-500  text-blue-500 hover:text-white'>

        <h1 className=' font-light text-sm'>{buttonText}</h1>

    </button>
  )
}
