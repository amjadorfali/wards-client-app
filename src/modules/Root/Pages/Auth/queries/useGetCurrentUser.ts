import { UseQueryResult } from '@tanstack/react-query';
import useGetCognitoCurrentUserInfo from './useGetCognitoCurrentUserInfo';
import { InternalUser, User } from 'utils/interfaces';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
// import axiosInstance from 'services/api';
import { dummyRQConfig } from 'utils/dummy-config';

interface InternalUserQuery {
	data: InternalUser;
}

const useGetCurrentUser = () => {
	const params = useParams<{ teamId: string }>();
	// const currentSession = useGetCurrentSession();
	const cognitoUserQuery = useGetCognitoCurrentUserInfo();
	// const internalUserQuery = useQuery({
	// 	queryKey: ['internal-user-info', cognitoUserQuery.data?.username],
	// 	enabled: cognitoUserQuery.isSuccess && !!cognitoUserQuery.data?.username,
	// 	refetchOnMount: false,
	// 	queryFn: () => axiosInstance.get<InternalUserQuery>('api/me/check').then((res) => res.data)
	// });

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	const internalUserQuery: UseQueryResult<InternalUserQuery, unknown> = {
		data: {
			data: {
				teams: [{ id: 1, healthCheckUsage: 1, uuid: '1', name: '1', users: [], HealthCheck: [], healthCheckId: '1', Incident: [] }]
			}
		},
		...dummyRQConfig
	};

	const currentTeam = useMemo(
		() => internalUserQuery.data?.data?.teams?.find((team) => team.uuid === params.teamId),
		[params.teamId, internalUserQuery.data?.data.teams]
	);

	const refetchAll = async () => {
		// await currentSession.refetch();
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
