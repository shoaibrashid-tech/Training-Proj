import React from 'react'

function SecondaryButton({buttonText, onClickHandler}) {
  return (
    <button onClick={onClickHandler} className='flex items-center justify-center w-full h-10 border-2 border-blue-500 hover:border-white hover:bg-blue-500 rounded-sm text-blue-500 hover:text-white'>

        <h1 className=' font-light text-sm'>{buttonText}</h1>

    </button>
  )
}

export default SecondaryButton