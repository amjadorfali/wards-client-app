import { Auth } from '@aws-amplify/auth';
import { AuthError } from '@aws-amplify/auth/lib-esm/Errors';
import { useMutation } from '@tanstack/react-query';

/**
 *
 * @description Signs out the user from all devices
 */
const useGlobalSignOut = () => {
	return useMutation<unknown, AuthError, void, unknown>({
		mutationFn: () => Auth.signOut({ global: true })
	});
};
export default useGlobalSignOut;
