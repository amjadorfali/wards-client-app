import { Auth } from '@aws-amplify/auth';
import { useMutation } from '@tanstack/react-query';
import { CustomCognitoUser } from 'utils/interfaces';
import type { ISignUpResult } from 'amazon-cognito-identity-js';
import { AuthError } from '@aws-amplify/auth/lib-esm/Errors';

type UserAttr = { [key in keyof CustomCognitoUser['attributes']]: CustomCognitoUser['attributes'][key] };
interface SignUpParams extends UserAttr {
	password: string;
}

const useSignUp = () => {
	const signUp = useMutation<ISignUpResult, AuthError, SignUpParams, unknown>({
		mutationFn: ({ password, email, phoneNumber }: SignUpParams) =>
			Auth.signUp({
				username: email,
				password,
				attributes: {
					email,
					phone_number: phoneNumber
				},
				autoSignIn: {
					// optional - enables auto sign in after user is confirmed
					enabled: true
				}
			})
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
