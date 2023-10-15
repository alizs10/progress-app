import React from 'react'
import PlusIcon from './icons/PlusIcon'

function NewProgressBtn() {
    return (
        <button className='fixed z-50 shadow-md shadow-black left-1/2 -translate-x-1/2 bottom-0 -translate-y-2/3 w-10 flex justify-center items-center aspect-square rotate-45 rounded-md bg-emerald-700'>
            <span className='scale-125 -rotate-45 text-white'>
                <PlusIcon />
            </span>
        </button>
    )
}

export default NewProgressBtn