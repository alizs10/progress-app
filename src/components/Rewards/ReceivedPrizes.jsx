import React from 'react'
import ReceivedPrize from './ReceivedPrize'

function ReceivedPrizes() {
    return (
        <div className='p-6 flex flex-col gap-y-3'>
            <h2 className="text-gray-400 border-b-2 border-gray-400 pb-2">Achieved Prizes <span className='font-bold text-yellow-400 text-xs'>3</span></h2>

            <div className='flex flex-col gap-y-3'>

                <ReceivedPrize />
            </div>
        </div>
    )
}

export default ReceivedPrizes