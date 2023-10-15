import React from 'react'
import LightBulbIcon from './icons/LightBulbIcon'
import useAppStore from '../../store/app-store'

function Hints() {

    const { closeHints } = useAppStore()

    return (
        <div className='fixed inset-0 z-[999] backdrop-blur-sm'>
            <div className='fixed w-[80vw] flex flex-col top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 overflow-hidden rounded-xl bg-slate-800 shadow-md shadow-black'>

                <div className='flex flex-nowrap items-start gap-x-2 p-3 mt-2 text-yellow-200 text-lg'>
                    <span className='w-5'>
                        <LightBulbIcon />
                    </span>
                    <h2>Hints</h2>
                </div>
                <div className='mb-4 p-3'>
                    <ul className='list-decimal list-inside flex flex-col gap-y-1 text-white text-base'>
                        <li className=''>Swipe Right to step forward</li>
                        <li className=''>Swipe Left to step backward</li>
                    </ul>
                </div>


                <button
                    onClick={closeHints}
                    className='mt-auto bg-emerald-600 text-white text-lg py-2'>
                    Ok
                </button>

            </div>
        </div>

    )
}

export default Hints