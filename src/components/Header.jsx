import React, { useEffect, useState } from 'react'
import RewardIcon from './icons/RewardIcon'
import useAppStore from '../../store/app-store'
import BarsIcon from './icons/BarsIcon'
import UserProfileIcon from './icons/UserProfileIcon'
import { AnimatePresence } from 'framer-motion'
import Menu from './Menu'
import Settings from './Settings'
import About from './About'
import ProfilePopup from './ProfilePopup'

function Header() {

    const { openRewards } = useAppStore()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [settingsVis, setSettingsVis] = useState(false)
    const [aboutVis, setAboutVis] = useState(false)
    const [profilePopupVis, setProfilePopupVis] = useState(false)

    function toggleMenu() {
        setIsMenuOpen(prevState => !prevState)
    }

    useEffect(() => {

        if (settingsVis || aboutVis) {
            setIsMenuOpen(false)
        }
    }, [settingsVis, aboutVis])



    return (
        <div className='h-12 relative flex justify-between items-center p-3 m-3 bg-slate-800 rounded-xl shadow-sm shadow-black'>
            <div className="flex gap-x-1 items-center">
                <button onClick={toggleMenu} className="flex justify-center items-center p-[5px] text-white rounded-full transition-all duration-300 hover:bg-gray-600">
                    <div className="w-5 h-5">
                        <BarsIcon />
                    </div>
                </button>
                <h1 className='text-xl font-bold text-white'>Progresses</h1>
            </div>
            <div className="flex gap-x-2 items-center">
                <button onClick={openRewards} className='fill-yellow-400'>
                    <RewardIcon />
                </button>
                <button onClick={() => setProfilePopupVis(true)} className='flex justify-center items-center text-white'>
                    <span className='w-7'>
                        <UserProfileIcon />
                    </span>
                </button>
            </div>
            <AnimatePresence>
                {profilePopupVis && (
                    <div
                        onClick={() => setProfilePopupVis(false)}
                        className='fixed inset-0 w-full left-1/2 -translate-x-1/2 max-w-[600px] z-[999999]'>
                        <ProfilePopup handleOpenProfilePopup={() => setProfilePopupVis(true)} />

                    </div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isMenuOpen && (
                    <div
                        onClick={() => setIsMenuOpen(false)}
                        className='fixed inset-0 w-full left-1/2 -translate-x-1/2 max-w-[600px] z-[999999]'>
                        <Menu handleOpenSettings={() => setSettingsVis(true)} handleOpenAbout={() => setAboutVis(true)} />

                    </div>
                )}
            </AnimatePresence>




            <AnimatePresence>
                {settingsVis && (
                    <>
                        <Settings handleClose={() => setSettingsVis(false)} />
                    </>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {aboutVis && (
                    <>
                        <About handleClose={() => setAboutVis(false)} />
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Header