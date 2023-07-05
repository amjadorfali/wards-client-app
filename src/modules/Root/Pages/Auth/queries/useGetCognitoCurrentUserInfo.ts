import { Auth } from '@aws-amplify/auth';
import { useQuery } from '@tanstack/react-query';
import { CustomCognitoUser } from 'utils/interfaces';

const useGetCognitoCurrentUserInfo = (enabled: boolean) => {
	return useQuery<CustomCognitoUser, Error, CustomCognitoUser, string[]>({
		queryKey: ['cognito-user-info'],
		queryFn: () => Auth.currentUserInfo(),
		enabled,
		refetchOnMount: false
	});
};

export default useGetCognitoCurrentUserInfo;
