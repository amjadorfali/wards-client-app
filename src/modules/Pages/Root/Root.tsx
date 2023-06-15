import React from 'react';
import { Outlet } from 'react-router-dom';
import { SS_KEY_scroll } from 'hooks';
import { ScrollRestoration } from 'react-router-dom';
import { Navbar } from 'modules/layout/Navbar';
import { Footer } from 'modules/layout/Footer';

const Root: React.FC = () => {
	return (
		<>
			<ScrollRestoration getKey={({ pathname }) => pathname} storageKey={SS_KEY_scroll} />
			<Navbar />
			<Outlet />
			<Footer />
		</>
	);
};

export default Root;
