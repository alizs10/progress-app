import React, { useEffect, useState } from 'react'
import NewProgressBtn from './NewProgressBtn'
import BarsIcon from './icons/BarsIcon'
import ProgressCheckIcon from './icons/ProgressCheckIcon'
import ProgressClockIcon from './icons/ProgressClockIcon'
import UserProfileIcon from './icons/UserProfileIcon'
import useProgressesStore from '../../store/progresses-store'
import Menu from './Menu'
import { AnimatePresence } from 'framer-motion'
import Settings from './Settings'

function BottomBar() {

    const { showUnDoneProgresses, showDoneProgresses, data, showProgressesType } = useProgressesStore()

    const [countData, setCountData] = useState({ inProgress: 0, completed: 0 })
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [settingsVis, setSettingsVis] = useState(true)

    function toggleMenu() {
        setIsMenuOpen(prevState => !prevState)
    }

    useEffect(() => {

        if (settingsVis) {
            setIsMenuOpen(false)
        }
    }, [settingsVis])

    useEffect(() => {

        if (isMenuOpen && showProgressesType === 1) {
            setIsMenuOpen(false)
        }
    }, [showProgressesType])


    useEffect(() => {

        let allCount = data.length;
        let undoneCount = 0;
        let doneCount = 0;

        data.map(pg => {
            let passedSteps = pg.steps.filter(st => st.status)
            if (passedSteps.length === pg.steps.length) {
                doneCount++;
            }
        })

        undoneCount = allCount - doneCount;

        setCountData({ inProgress: undoneCount, completed: doneCount })

    }, [data, showProgressesType])

    return (
        <section className='relative'>
            <NewProgressBtn />
            <div className='fixed z-40 max-w-[600px] w-full left-1/2 -translate-x-1/2 bottom-0 top-auto h-14 bg-slate-800 grid grid-cols-5 gap-0'>
                <button
                    onClick={toggleMenu}
                    className={`col-span-1 flex justify-center items-center text-white ${isMenuOpen && 'bg-gray-700'}`}>
                    <span className='fill-white'>
                        <BarsIcon />
                    </span>
                </button>

                <button
                    onClick={showUnDoneProgresses}
                    className={`col-span-1 flex justify-center items-center text-white ${showProgressesType === 0 && 'bg-gray-700'}`}>
                    <span className='fill-white relative'>
                        <ProgressClockIcon />
                        <div className='absolute -bottom-1 left-[75%] min-w-[1rem] px-1 rounded-full bg-yellow-500 text-black flex justify-center items-center text-[10px]'>{countData.inProgress}</div>
                    </span>
                </button>

                <div className='col-span-1'></div>

                <button
                    onClick={showDoneProgresses}
                    className={`col-span-1 flex justify-center items-center text-white ${showProgressesType === 2 && 'bg-gray-700'}`}>
                    <span className='fill-white relative'>
                        <ProgressCheckIcon />
                        <div className='absolute -bottom-1 left-[75%]  min-w-[1rem] px-1 rounded-full bg-emerald-700 text-white flex justify-center items-center text-[10px]'>{countData.completed}</div>
                    </span>
                </button>
                <button className='col-span-1 flex justify-center items-center text-white'>
                    <span className='w-7'>
                        <UserProfileIcon />
                    </span>
                </button>


            </div>



            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <Menu handleOpenSettings={() => setSettingsVis(true)} />
                        <div
                            onClick={() => setIsMenuOpen(false)}
                            className='fixed inset-0 z-20'></div>
                    </>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {settingsVis && (
                    <>
                        <Settings handleClose={() => setSettingsVis(false)} />
                        <div
                            onClick={() => setSettingsVis(false)}
                            className='fixed inset-0 z-20'></div>
                    </>
                )}
            </AnimatePresence>
        </section>
    )
}

export default BottomBar