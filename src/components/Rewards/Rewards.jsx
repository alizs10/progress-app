import React, { useState } from 'react'
import Header from './Header'
import Goals from './Goals'
import NewGoalWindow from './NewGoalWindow'
import ReceivedPrizes from './ReceivedPrizes'

function Rewards() {

    const [newGoalWindowVis, setNewGoalWindowVis] = useState(false)

    function handleOpenNewGoalWindow() {
        setNewGoalWindowVis(true)
    }
    function handleCloseNewGoalWindow() {
        setNewGoalWindowVis(false)

    }

    return (
        <section className='max-w-[600px] mx-auto fixed inset-0 bg-slate-800 z-[999999] overflow-y-scroll'>
            <Header handleOpenNewGoalWindow={handleOpenNewGoalWindow} />
            <Goals />
            <ReceivedPrizes />
            {newGoalWindowVis && (<NewGoalWindow />)}
        </section>
    )
}

export default Rewards