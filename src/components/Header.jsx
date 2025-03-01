import React, { useEffect, useState } from 'react'
import useAppStore from '../../store/app-store'
import { AnimatePresence } from 'framer-motion'
import Menu from './Menu'
import Settings from './Settings'
import About from './About'
import ProfilePopup from './ProfilePopup'
import { Crosshair, MenuIcon, User } from 'lucide-react'

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
        <div className='relative grid items-center h-12 grid-cols-5 m-3 overflow-hidden rounded-full bg-slate-800'>
            <div className="flex items-center h-full col-span-4 gap-x-1">
                <button onClick={toggleMenu} className="flex items-center justify-center px-5 py-3 text-white transition-all duration-300 rounded-full hover:bg-gray-600">
                    <MenuIcon className={"size-5"} />
                </button>

                <input
                    type="text"
                    placeholder="Search progresses"
                    className="w-full h-full text-white placeholder-gray-400 bg-transparent focus:outline-none"
                />
            </div>
            <div className="flex items-center justify-end col-span-1 px-5 py-3 gap-x-2">
                <button onClick={openRewards} className='text-yellow-400'>
                    <Crosshair className='size-5' />
                </button>
                <button onClick={() => setProfilePopupVis(true)} className='flex items-center justify-center text-white'>
                    <User className='size-5' />
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