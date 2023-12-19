import React from 'react'
import Goal from './Goal'
import useProgressesStore from '../../../store/progresses-store'
import EmptyGoals from './EmptyGoals'

function Goals() {

    const { goals } = useProgressesStore()

    return (
        <div className='p-3 flex flex-col gap-y-3'>
            <h2 className="text-gray-400 border-b-2 border-gray-400 pb-2">Your Goals <span className='font-bold text-yellow-400 text-xs'>{goals.length}</span></h2>

            {goals.length > 0 ? (
                <div className='p-3 flex flex-col gap-y-3'>
                    {goals.map(goal => <Goal key={goal._id} goal={goal} />)}

                </div>
            ) : (
                <EmptyGoals />
            )}
        </div>
    )
}

export default Goals