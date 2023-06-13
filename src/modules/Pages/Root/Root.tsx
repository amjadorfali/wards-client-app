import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../LandingPage/Navbar';
import { SS_KEY_scroll } from 'hooks';
import { ScrollRestoration } from 'react-router-dom';

const Root: React.FC = () => {
	return (
		<>
			<ScrollRestoration getKey={({ pathname }) => pathname} storageKey={SS_KEY_scroll} />
			<Navbar />
			<Outlet />
		</>
	);
};

export default Root;
