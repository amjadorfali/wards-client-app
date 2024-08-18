import { UseQueryResult } from '@tanstack/react-query';
import { dummyRQConfig } from 'utils/dummy-config';
import { CustomCognitoUser } from 'utils/interfaces';

/**
 *
 * @link [See this section for more info on how to use this fn](https://docs.amplify.aws/lib/auth/manageusers/q/platform/js#retrieve-current-authenticated-user)
 */
const useGetCurrentAuthUser = (): UseQueryResult<CustomCognitoUser, Error> => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	return {
		...dummyRQConfig,
		data: {
			attributes: { email: '', phoneNumber: '' },
			username: 'dummy'
		}
	};
	// useQuery<CustomCognitoUser, Error, CustomCognitoUser, string[]>({
	// 	queryKey: ['currentAuthenticatedUser'],
	// 	queryFn: () => Auth.currentAuthenticatedUser({ bypassCache: false })
	// });
};

export default useGetCurrentAuthUser;
