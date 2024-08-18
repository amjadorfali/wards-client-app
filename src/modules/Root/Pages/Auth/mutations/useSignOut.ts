import { AuthError } from '@aws-amplify/auth/lib-esm/Errors';
import { useMutation } from '@tanstack/react-query';

const useSignOut = () => {
	return useMutation<unknown, AuthError, void, unknown>({
		mutationFn: () => {
			return Promise.resolve();
		}
	});
};
export default useSignOut;
