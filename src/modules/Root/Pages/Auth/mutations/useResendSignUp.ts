import { Auth } from '@aws-amplify/auth';
import { AuthError } from '@aws-amplify/auth/lib-esm/Errors';
import { useMutation } from '@tanstack/react-query';

const useResendSignUp = () => {
	return useMutation<unknown, AuthError, string, unknown>({
		mutationFn: (email) => Auth.resendSignUp(email)
	});
};
export default useResendSignUp;
