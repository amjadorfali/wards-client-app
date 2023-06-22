import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { SS_KEY_scroll } from 'hooks';
import { ScrollRestoration } from 'react-router-dom';
import { Navbar } from 'modules/layout/Navbar';
import { Footer } from 'modules/layout/Footer';
import DummyPage from 'modules/Pages/DummyPage/DummyPage';
import useLogger from '../Auth/hooks/useLogger';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
			<ToastContainer />
		</>
	);
};

export default Root;
