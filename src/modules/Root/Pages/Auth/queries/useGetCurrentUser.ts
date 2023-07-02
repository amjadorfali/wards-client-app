import { useQuery } from '@tanstack/react-query';
import useGetCognitoCurrentUserInfo from './useGetCognitoCurrentUserInfo';
import { InternalUser, User } from 'utils/interfaces';
import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TeamParams } from 'modules/Dashboard/Dashboard';
import useGetCurrentSession from './useGetCurrentSession';
import axiosInstance from 'services/api';
import { RoutesConfig } from 'config/Routes/routeConfig';

interface InternalUserQuery {
	data: InternalUser;
}

const useGetCurrentUser = () => {
	const navigate = useNavigate();
	const params = useParams<TeamParams>();
	const currentSession = useGetCurrentSession();
	const cognitoUserQuery = useGetCognitoCurrentUserInfo();
	const internalUserQuery = useQuery({
		queryKey: ['internal-user-info', cognitoUserQuery.data?.username],
		enabled: cognitoUserQuery.isSuccess && !!cognitoUserQuery.data?.username,
		queryFn: () => axiosInstance.get<InternalUserQuery>('api/me/check').then((res) => res.data)
	});

	//TODO: Might be causing perf issues, investigate later
	const currentTeam = useMemo(
		() => internalUserQuery.data?.data?.teams?.find((team) => team.uuid === params.teamId),
		[params.teamId, internalUserQuery.data?.data.teams]
	);

	//In case user enters an invalid team in the URL, redirect to Route Guards of Teams page
	useEffect(() => {
		if (internalUserQuery.isSuccess && !currentTeam?.uuid && params.teamId) {
			navigate(`${RoutesConfig.dashboard}/${RoutesConfig.teams}`);
		}
	}, [currentTeam?.uuid, navigate, params.teamId, internalUserQuery.isSuccess]);

	//FIXME: Better do these in mutations, you can have more control over the refetching in edge cases
	const refetchAll = async () => {
		await currentSession.refetch();
		await cognitoUserQuery.refetch();
		await internalUserQuery.refetch();
	};

	return {
		internalUserQuery,
		cognitoUserQuery,
		currentUser: { ...internalUserQuery.data?.data, ...cognitoUserQuery.data } as Partial<User>,
		currentTeam,
		refetchAll
	};
};

export default useGetCurrentUser;
