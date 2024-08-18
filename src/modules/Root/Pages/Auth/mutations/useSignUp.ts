import { Auth } from '@aws-amplify/auth';
import { useMutation } from '@tanstack/react-query';
import { CustomCognitoUser } from 'utils/interfaces';
import { AuthError } from '@aws-amplify/auth/lib-esm/Errors';

type UserAttr = { [key in keyof CustomCognitoUser['attributes']]: CustomCognitoUser['attributes'][key] };
interface SignUpParams extends UserAttr {
	password: string;
}

const useSignUp = () => {
	const signUp = useMutation<'', AuthError, SignUpParams, unknown>({
		mutationFn: () => Promise.resolve('')
	});

	const resendConfirmationCode = useMutation({
		mutationFn: (email: string) => Auth.resendSignUp(email)
	});

	return {
		signUp,
		resendConfirmationCode
	};
};
export default useSignUp;
