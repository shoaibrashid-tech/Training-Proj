import React from 'react'

export default function SearchBar({onChangeHandler, OnEnterHandler, searchText}) {
  return (
        <form onSubmit={OnEnterHandler} className='h-10 min-w-56 w-full rounded-4xl border-2 border-blue-500 flex'>
            <div className='flex-initial max-w-60 w-1/4 bg-white  text-blue-500 hover:text-white border-r-2 rounded-l-4xl'>
                <div ></div>
            </div>
            <div className='flex-1 w-2/4'>
                <input type="text" onChange={onChangeHandler}  placeholder='Looking for Something?' className=' px-4 focus:outline-none  rounded-l-4xl w-full h-full placeholder:font-extralight placeholder:text-gray-500' />
                
            </div>
            <button  type='submit' className='flex-initial max-w-50 w-1/4 bg-blue-500 hover:bg-white text-white hover:text-blue-500 hover:border-l-2 rounded-r-4xl'>
                <h1>{searchText}</h1>
            </button>
        </form>
  )
}
