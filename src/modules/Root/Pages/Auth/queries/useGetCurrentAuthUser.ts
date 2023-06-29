import { Auth } from '@aws-amplify/auth';
import { useQuery } from '@tanstack/react-query';
import { CustomCognitoUser } from 'utils/interfaces';

/**
 *
 * @link [See this section for more info on how to use this fn](https://docs.amplify.aws/lib/auth/manageusers/q/platform/js#retrieve-current-authenticated-user)
 */
const useGetCurrentAuthUser = () => {
	return useQuery<CustomCognitoUser, Error, CustomCognitoUser, string[]>({
		queryKey: ['currentAuthenticatedUser'],
		queryFn: () => Auth.currentAuthenticatedUser(),
		enabled: true
	});
};

export default useGetCurrentAuthUser;
