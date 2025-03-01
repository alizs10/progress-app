import React from 'react'
import { Plus } from 'lucide-react'

function NewProgressBtn({ handleClick }) {
    return (
        <button
            onClick={handleClick}
            className='flex items-center justify-center w-full h-full transition-all duration-300 rounded-full bg-emerald-700 hover:bg-emerald-800'>
            <Plus className='text-white size-6' />
        </button>
    )
}

export default NewProgressBtn