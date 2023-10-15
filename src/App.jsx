import React from 'react';
import Header from './components/Header';
import Progresses from './components/Progresses';
import BottomBar from './components/BottomBar';

function App() {
	return (
		<main className='h-screen font-mono relative max-w-[600px] mx-auto'>

			<Header />

			<Progresses />



			<BottomBar />

		</main>
	);
}

export default App;
