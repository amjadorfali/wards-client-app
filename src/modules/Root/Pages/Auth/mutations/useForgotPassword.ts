import { Auth } from '@aws-amplify/auth';
import { AuthError } from '@aws-amplify/auth/lib-esm/Errors';
import { useMutation } from '@tanstack/react-query';

interface ForgotPasswordParams {
	username: string;
	code: string;
	newPassword: string;
}
const useForgotPassword = () => {
	// Sends confirmation code to user's email
	const forgotPasswordMutation = useMutation<unknown, AuthError, string, unknown>({
		mutationFn: (username: string) => {
			return Auth.forgotPassword(username);
		}
	});

	// Collect confirmation code and new password, then
	const forgotPasswordSubmitMutation = useMutation<string, AuthError, ForgotPasswordParams, unknown>({
		mutationFn: ({ username, code, newPassword }: ForgotPasswordParams) => Auth.forgotPasswordSubmit(username, code, newPassword)
	});

	return {
		forgotPasswordMutation,
		forgotPasswordSubmitMutation
	};
};
export default useForgotPassword;