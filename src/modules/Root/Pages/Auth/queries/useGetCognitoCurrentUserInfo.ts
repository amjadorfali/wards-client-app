import { Auth } from '@aws-amplify/auth';
import { useQuery } from '@tanstack/react-query';
import { CustomCognitoUser } from 'utils/interfaces';
import useGetCurrentSession from './useGetCurrentSession';

const useGetCognitoCurrentUserInfo = () => {
	const currentSession = useGetCurrentSession();

	return useQuery<CustomCognitoUser, Error, CustomCognitoUser, string[]>({
		queryKey: ['cognito-user-info'],
		queryFn: () => Auth.currentUserInfo(),
		enabled: currentSession.isSuccess
	});
};

export default useGetCognitoCurrentUserInfo;
