import { Auth } from '@aws-amplify/auth';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import axiosInstance from 'services/api';

/**
 * @link [See this section for more info on how to use this fn](https://docs.amplify.aws/lib/auth/manageusers/q/platform/js#retrieve-current-session)
 */
const useGetCurrentSession = () => {
	const currentSession = useQuery({
		queryKey: ['currentSession'],
		queryFn: () => Auth.currentSession(),
		retry: 1
	});

	useEffect(() => {
		if (!currentSession.isSuccess) return;
		const idToken = currentSession.data?.getAccessToken();
		const jwtToken = idToken?.getJwtToken();
		if (jwtToken) {
			axiosInstance.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
		} else {
			axiosInstance.defaults.headers.common.Authorization = undefined;
		}
	}, [currentSession.data, currentSession.isSuccess]);

	return currentSession;
};

export default useGetCurrentSession;
