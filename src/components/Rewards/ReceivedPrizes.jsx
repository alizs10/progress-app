import React from 'react'
import ReceivedPrize from './ReceivedPrize'
import useProgressesStore from '../../../store/progresses-store'
import EmptyPrizes from './EmptyPrizes'

function ReceivedPrizes() {

    const { prizes } = useProgressesStore()


    return (
        <div className='p-3 flex flex-col gap-y-3'>
            <h2 className="text-gray-400 border-b-2 border-gray-400 pb-2">Achieved Prizes <span className='font-bold text-yellow-400 text-xs'>{prizes.length}</span></h2>

            {prizes.length > 0 ? (
                <div className='flex flex-col gap-y-3'>
                    {prizes.map(prize => <ReceivedPrize prize={prize} />)}

                </div>
            ) : (
                <EmptyPrizes />
            )}


        </div>
    )
}

export default ReceivedPrizes