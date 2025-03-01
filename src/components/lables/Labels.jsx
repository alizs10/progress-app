import { AnimatePresence } from 'framer-motion'
import React from 'react'
import NewLabelWindow from '../NewLabelWindow'
import LabelsBar from '../LabelsBar'

export default function Labels({ setNewLabelWindowVis, newLabelWindowVis }) {
    return (
        <>
            <LabelsBar setNewLabelWindowVis={setNewLabelWindowVis} />

            <AnimatePresence>
                {newLabelWindowVis && (<NewLabelWindow handleClose={() => setNewLabelWindowVis(false)} />)}
            </AnimatePresence>

        </>
    )
}
