import { Auth } from '@aws-amplify/auth';
import { useQuery } from '@tanstack/react-query';

/**
 * @link [See this section for more info on how to use this fn](https://docs.amplify.aws/lib/auth/manageusers/q/platform/js#retrieve-current-session)
 */
const useGetCurrentSession = () => {
	return useQuery({
		queryKey: ['currentSession'],
		queryFn: () => Auth.currentSession()
	});
};

export default useGetCurrentSession;
