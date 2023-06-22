import { Auth } from '@aws-amplify/auth';
import { AuthError } from '@aws-amplify/auth/lib-esm/Errors';
import { useMutation } from '@tanstack/react-query';

const useSignOut = () => {
	return useMutation<unknown, AuthError, void, unknown>({
		mutationFn: () => {
			return Auth.signOut();
		}
	});
};
export default useSignOut;
