import { Auth } from '@aws-amplify/auth';
import { useQuery } from '@tanstack/react-query';
import { User } from 'utils/interfaces';

/**
 *
 * @link [See this section for more info on how to use this fn](https://docs.amplify.aws/lib/auth/manageusers/q/platform/js#retrieve-current-authenticated-user)
 */
const useGetCurrentUserInfo = () => {
	return useQuery<User, Error, User, string[]>({
		queryKey: ['current-user'],
		queryFn: () => Auth.currentUserInfo(),
		enabled: true
	});
};

export default useGetCurrentUserInfo;
