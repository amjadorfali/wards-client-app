import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { SS_KEY_scroll } from 'hooks';
import { ScrollRestoration } from 'react-router-dom';
import DummyPage from 'modules/Root/Pages/DummyPage/DummyPage';
import useLogger from './Pages/Auth/hooks/useLogger';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Root: React.FC = () => {
	useLogger();
	return (
		<>
			<ScrollRestoration getKey={({ pathname }) => pathname} storageKey={SS_KEY_scroll} />
			<Navbar />
			<Suspense fallback={<DummyPage loadOnly />}>
				<Outlet />
			</Suspense>
			<Footer />
		</>
	);
};

export default Root;
