import { useRef } from "react"
import React from 'react'

export default function SearchFilter({ setStateToEdit, searchText }) {

  const debounceRef = useRef(null);

  const onChangeHandler = (event) => {
    const value = event.target.value;

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setStateToEdit(value);
    }, 600); // debounce delay
  }

  const OnEnterHandler = (event) => {
    event.preventDefault();
    console.log("Enter");
  }

  return (
    <form onSubmit={OnEnterHandler} className='h-10 min-w-56 w-full rounded-md border-2 border-blue-500 flex'>
        <div className='flex-1 w-2/3'>
            <input
                type="text"
                onChange={onChangeHandler}
                placeholder='Looking for Something?'
                className='px-4 focus:outline-none rounded-l-4xl w-full h-full placeholder:font-extralight placeholder:text-gray-500'
            />
        </div>

        <button
            type='submit'
            className='flex-initial max-w-50 w-1/3 bg-blue-500 hover:bg-white text-white hover:text-blue-500 hover:border-l-2 rounded-r-sm'
        >
            <h1>{searchText}</h1>
        </button>
    </form>
  )
}