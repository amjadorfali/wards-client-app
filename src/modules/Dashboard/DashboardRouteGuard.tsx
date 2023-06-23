import React, { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RoutesConfig } from 'config/Routes/routeConfig';
import DummyPage from 'modules/Root/Pages/DummyPage/DummyPage';
import useGetCurrentUserInfo from 'modules/Root/Pages/Auth/queries/useGetCurrentUserInfo';
import useGetCurrentSession from 'modules/Root/Pages/Auth/queries/useGetCurrentSession';
const DashboardRouteGuard: React.FC<PropsWithChildren> = ({ children }) => {
	const currentUser = useGetCurrentUserInfo();
	const navigate = useNavigate();
	const location = useLocation();
	const currentSession = useGetCurrentSession();

	useEffect(() => {
		const awaitUserData = async () => {
			await currentSession.refetch();
			const userData = await currentUser.refetch();
			if (!userData.data?.username && location?.pathname !== RoutesConfig.dashboard) {
				navigate(`/${RoutesConfig.signIn}`, { replace: true });
			}
		};
		awaitUserData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location?.pathname]);
	return <>{currentUser.status === 'loading' ? <DummyPage loadOnly /> : children}</>;
};

export default DashboardRouteGuard;
