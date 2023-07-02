import React, { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesConfig } from 'config/Routes/routeConfig';
import DummyPage from 'modules/Root/Pages/DummyPage/DummyPage';
import useGetCurrentSession from './queries/useGetCurrentSession';
import useGetCurrentUser from './queries/useGetCurrentUser';
import { getTeamId } from 'stores/auth.store';

const AuthRouteGuard: React.FC<PropsWithChildren> = ({ children }) => {
	const { cognitoUserQuery, currentUser, internalUserQuery } = useGetCurrentUser();
	const currentSession = useGetCurrentSession();
	const navigate = useNavigate();

	useEffect(() => {
		const awaitUserData = async () => {
			await currentSession.refetch();
			const userData = await cognitoUserQuery.refetch();
			userData.data?.username && (await internalUserQuery.refetch());
			if (userData.data?.username) {
				navigate(`${RoutesConfig.dashboard}/${RoutesConfig.dashboardTeam}/${getTeamId(currentUser)}`, { replace: true });
			}
		};
		awaitUserData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return <>{cognitoUserQuery.status === 'loading' ? <DummyPage loadOnly /> : children}</>;
};

export default AuthRouteGuard;
