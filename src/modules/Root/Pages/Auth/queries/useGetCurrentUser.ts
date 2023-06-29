import { useQuery } from '@tanstack/react-query';
import useGetCognitoCurrentUserInfo from './useGetCognitoCurrentUserInfo';
import axios from 'axios';
import { InternalUser, User } from 'utils/interfaces';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { TeamParams } from 'modules/Dashboard/Team';
import useGetCurrentSession from './useGetCurrentSession';

interface InternalUserQuery {
	data: InternalUser;
}

const useGetCurrentUser = () => {
	const params = useParams<TeamParams>();
	const currentSession = useGetCurrentSession();
	const cognitoUserQuery = useGetCognitoCurrentUserInfo();
	const internalUserQuery = useQuery({
		queryKey: ['internal-user-info', cognitoUserQuery.data?.username],
		enabled: cognitoUserQuery.isSuccess,
		queryFn: () =>
			axios
				.get<InternalUserQuery>(import.meta.env.VITE_INTERNAL_API_HOST + 'api/user/' + cognitoUserQuery.data?.username)
				.then((res) => res.data)
	});

	//TODO: Might be causing perf issues, investigate later
	const currentTeam = useMemo(
		() => internalUserQuery.data?.data.teams.find((team) => team.id === Number(params.teamId)),
		[params.teamId, internalUserQuery.data?.data.teams]
	);

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
