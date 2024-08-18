// import { Auth } from '@aws-amplify/auth';
import { UseQueryResult } from '@tanstack/react-query';
import { dummyRQConfig } from 'utils/dummy-config';
import { CustomCognitoUser } from 'utils/interfaces';

const useGetCognitoCurrentUserInfo = (): UseQueryResult<CustomCognitoUser, Error> => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return {
		...dummyRQConfig,
		data: {
			attributes: { email: '', phoneNumber: '' },
			username: 'dummy'
		}
	};

	// useQuery<CustomCognitoUser, Error, CustomCognitoUser, string[]>({
	// 	queryKey: ['cognito-user-info'],
	// 	queryFn: () => Auth.currentUserInfo(),
	// 	enabled,
	// 	refetchOnMount: false
	// });
};

export default useGetCognitoCurrentUserInfo;
