import { Auth, CognitoUser } from '@aws-amplify/auth';
import { AuthError } from '@aws-amplify/auth/lib-esm/Errors';
import { useMutation } from '@tanstack/react-query';

interface SignInProps {
	username: string;
	password: string;
}
const useSignIn = () => {
	return useMutation<CognitoUser, AuthError, SignInProps>({
		mutationFn: ({ password, username }: SignInProps) => Auth.signIn(username, password)
	});
};
export default useSignIn;
