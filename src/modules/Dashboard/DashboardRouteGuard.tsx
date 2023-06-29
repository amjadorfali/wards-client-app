import React, { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RoutesConfig } from 'config/Routes/routeConfig';
import DummyPage from 'modules/Root/Pages/DummyPage/DummyPage';
import useGetCurrentSession from 'modules/Root/Pages/Auth/queries/useGetCurrentSession';
import useGetCurrentUser from 'modules/Root/Pages/Auth/queries/useGetCurrentUser';
const DashboardRouteGuard: React.FC<PropsWithChildren> = ({ children }) => {
	const { cognitoUserQuery } = useGetCurrentUser();
	const navigate = useNavigate();
	const location = useLocation();
	const currentSession = useGetCurrentSession();

	useEffect(() => {
		const awaitUserData = async () => {
			await currentSession.refetch();
			const userData = await cognitoUserQuery.refetch();
			if (!userData.data?.username && location?.pathname !== RoutesConfig.dashboard) {
				navigate(`/${RoutesConfig.signIn}`, { replace: true });
			}
		};
		awaitUserData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location?.pathname]);
	return <>{cognitoUserQuery.status === 'loading' ? <DummyPage loadOnly /> : children}</>;
};

export default DashboardRouteGuard;
