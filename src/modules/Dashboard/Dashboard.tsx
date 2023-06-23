import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardRouteGuard from './DashboardRouteGuard';
import DummyPage from 'modules/Root/Pages/DummyPage/DummyPage';
import Menu from './components/NavMenu';

const Home: React.FC = () => {
	return (
		<>
			<Menu>
				<Suspense fallback={<DummyPage loadOnly />}>
					<DashboardRouteGuard>
						<Outlet />
					</DashboardRouteGuard>
				</Suspense>
			</Menu>
		</>
	);
};

export default Home;
