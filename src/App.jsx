import React from 'react';
import Header from './components/Header';
import Progresses from './components/Progresses';
import BottomBar from './components/BottomBar';
import Hints from './components/Hints';
import useAppStore from '../store/app-store';
import Notifications from './components/Notification/Notifications';

function App() {

	const { userHints } = useAppStore()

	return (
		<main className='h-screen font-mono relative max-w-[600px] mx-auto'>

			{userHints && (
				<Hints />
			)}


			<Header />
			<Progresses />
			<BottomBar />

			<Notifications />
		</main>
	);
}

export default App;
