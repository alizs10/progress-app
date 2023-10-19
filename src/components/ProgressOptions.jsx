import React from 'react'
import PinIcon from './icons/PinIcon'
import EditIcon from './icons/EditIcon'
import TrashIcon from './icons/TrashIcon'
import useProgressesStore from '../../store/progresses-store'

function ProgressOptions({ progressIndex }) {

    const { viewMode } = useProgressesStore()

    console.log(viewMode)

    return (
        <div className={`absolute ${viewMode === 0 ? ('bottom-0 translate-y-[120%] left-1/2 -translate-x-1/2') : (progressIndex % 2 === 0 ? 'flex-col bottom-2 right-0 translate-x-[120%]' : 'flex-col bottom-2 left-0 -translate-x-[120%]')} flex  gap-2`}>
            <button className='w-fit p-3 flex gap-x-2 items-center rounded-full bg-gray-300 fill-gray-700 text-lg text-center'>
                <div className='w-6'>
                    <PinIcon />
                </div>
            </button>
            <button className='w-fit p-3 flex gap-x-2 items-center rounded-full bg-yellow-100 text-yellow-600 text-lg text-center'>
                <div className='w-6'>
                    <EditIcon />
                </div>
            </button>
            <button className='w-fit p-3 flex gap-x-2 items-center rounded-full bg-red-100 text-red-600 text-lg text-center'>
                <div className='w-6'>
                    <TrashIcon />
                </div>
            </button>
        </div>
    )
}

export default ProgressOptions