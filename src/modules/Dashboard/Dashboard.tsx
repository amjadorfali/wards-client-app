import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardRouteGuard from './DashboardRouteGuard';
import DummyPage from 'modules/Root/Pages/DummyPage/DummyPage';

const Home: React.FC = () => {
	return (
		<Suspense fallback={<DummyPage loadOnly />}>
			<DashboardRouteGuard>
				<Outlet />
			</DashboardRouteGuard>
		</Suspense>
	);
};

export default Home;
