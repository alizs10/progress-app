import React from 'react';
import Header from './components/Header';
import Progresses from './components/Progresses';
import BottomBar from './components/BottomBar';
import Hints from './components/Hints';
import useAppStore from '../store/app-store';
import Notifications from './components/Notification/Notifications';
import { AnimatePresence } from 'framer-motion';
import Rewards from './components/Rewards/Rewards';


function App() {

	const { userHints, rewardsVis } = useAppStore()

	return (
		<main className='h-screen font-mono relative max-w-[600px] mx-auto'>

			<AnimatePresence>
				{userHints && (
					<Hints />
				)}
			</AnimatePresence>


			<Header />
			<Progresses />
			<BottomBar />

			<AnimatePresence>
				{rewardsVis && (
					<Rewards />
				)}
			</AnimatePresence>

			<Notifications />
		</main>
	);
}

export default App;
