import { useQuery } from '@tanstack/react-query';
import useGetCognitoCurrentUserInfo from './useGetCognitoCurrentUserInfo';
import { InternalUser, User } from 'utils/interfaces';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useGetCurrentSession from './useGetCurrentSession';
import axiosInstance from 'services/api';

interface InternalUserQuery {
	data: InternalUser;
}

const useGetCurrentUser = () => {
	const params = useParams<{ teamId: string }>();
	const currentSession = useGetCurrentSession();
	const cognitoUserQuery = useGetCognitoCurrentUserInfo(currentSession.isSuccess);
	const internalUserQuery = useQuery({
		queryKey: ['internal-user-info', cognitoUserQuery.data?.username],
		enabled: cognitoUserQuery.isSuccess && !!cognitoUserQuery.data?.username,
		refetchOnMount: false,
		queryFn: () => axiosInstance.get<InternalUserQuery>('api/me/check').then((res) => res.data)
	});

	const currentTeam = useMemo(
		() => internalUserQuery.data?.data?.teams?.find((team) => team.uuid === params.teamId),
		[params.teamId, internalUserQuery.data?.data.teams]
	);

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
