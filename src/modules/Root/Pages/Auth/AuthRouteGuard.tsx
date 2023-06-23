import React, { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import useGetCurrentUserInfo from './queries/useGetCurrentUserInfo';
import { useNavigate } from 'react-router-dom';
import { RoutesConfig } from 'config/Routes/routeConfig';
import DummyPage from 'modules/Root/Pages/DummyPage/DummyPage';
import useGetCurrentSession from './queries/useGetCurrentSession';
const AuthRouteGuard: React.FC<PropsWithChildren> = ({ children }) => {
	const currentUser = useGetCurrentUserInfo();
	const currentSession = useGetCurrentSession();
	const navigate = useNavigate();

	useEffect(() => {
		const awaitUserData = async () => {
			await currentSession.refetch();
			const userData = await currentUser.refetch();
			if (userData.data?.username) {
				navigate(RoutesConfig.dashboard, { replace: true });
			}
		};
		awaitUserData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return <>{currentUser.status === 'loading' ? <DummyPage loadOnly /> : children}</>;
};

export default AuthRouteGuard;
