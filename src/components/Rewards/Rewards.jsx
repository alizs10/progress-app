import React, { useState } from 'react'
import Header from './Header'
import Goals from './Goals'
import NewGoalWindow from './NewGoalWindow'
import ReceivedPrizes from './ReceivedPrizes'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'

function Rewards() {

    const [newGoalWindowVis, setNewGoalWindowVis] = useState(false)


    function handleOpenNewGoalWindow() {
        setNewGoalWindowVis(true)
    }
    function handleCloseNewGoalWindow() {
        setNewGoalWindowVis(false)

    }

    return (
        <motion.section
            initial={{ x: '100%' }}
            animate={{ x: '0' }}
            exit={{ x: '100%' }}
            transition={{ bounce: "none", duration: .2 }}
            className='max-w-[600px] mx-auto no-scrollbar fixed inset-0 bg-slate-900 z-[999999] overflow-y-scroll'>
            <Header handleOpenNewGoalWindow={handleOpenNewGoalWindow} />
            <Goals />
            <ReceivedPrizes />
            <AnimatePresence>
                {newGoalWindowVis && (<NewGoalWindow handleClose={handleCloseNewGoalWindow} />)}
            </AnimatePresence>
        </motion.section>
    )
}

export default Rewards