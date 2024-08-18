import { useMutation } from '@tanstack/react-query';
import { AuthError } from '@aws-amplify/auth/lib-esm/Errors';

interface ChangePasswordParams {
	oldPassword: string;
	newPassword: string;
}

const useChangePassword = () => {
	return useMutation<'SUCCESS', AuthError, ChangePasswordParams, unknown>({
		mutationFn: () => Promise.resolve('SUCCESS')
	});
};
export default useChangePassword;
