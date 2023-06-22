import { Auth } from '@aws-amplify/auth';
import { useQuery } from '@tanstack/react-query';
import { User } from 'utils/interfaces';
import useGetCurrentSession from './useGetCurrentSession';

const useGetCurrentUserInfo = () => {
	const currentSession = useGetCurrentSession();

	return useQuery<User, Error, User, string[]>({
		queryKey: ['currentUserInfo'],
		queryFn: () => Auth.currentUserInfo(),
		enabled: currentSession.isSuccess
	});
};

export default useGetCurrentUserInfo;
