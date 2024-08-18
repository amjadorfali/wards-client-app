import { AuthError } from '@aws-amplify/auth/lib-esm/Errors';
import { useMutation } from '@tanstack/react-query';

interface SignInProps {
	username: string;
	password: string;
}
const useSignIn = () => {
	return useMutation<string, AuthError, SignInProps>({
		mutationFn: () => Promise.resolve('')
	});
};
export default useSignIn;
