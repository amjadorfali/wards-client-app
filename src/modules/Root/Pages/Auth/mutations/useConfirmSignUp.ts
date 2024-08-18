import { AuthError } from '@aws-amplify/auth/lib-esm/Errors';
import { useMutation } from '@tanstack/react-query';
interface ConfirmSignUpParams {
	username: string;
	code: string;
}
const useConfirmSignUp = () => {
	return useMutation<unknown, AuthError, ConfirmSignUpParams, unknown>({
		mutationFn: ({ username, code }: ConfirmSignUpParams) => Promise.resolve({ username, code })
	});
};

export default useConfirmSignUp;
