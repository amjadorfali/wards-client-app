import { Auth, CognitoUser } from '@aws-amplify/auth';
import { AuthError } from '@aws-amplify/auth/lib-esm/Errors';
import { useMutation } from '@tanstack/react-query';
import { CustomCognitoUser } from 'utils/interfaces';

const useVerifyUserAttrUpdate = (attr: keyof CustomCognitoUser['attributes']) => {
	const verifyUserAttribute = useMutation<void, AuthError, CognitoUser, unknown>({
		mutationFn: (user: CognitoUser) => Auth.verifyUserAttribute(user, attr)
	});
	const verifyUserAttributeSubmit = useMutation<
		string,
		AuthError,
		{
			user: CognitoUser;
			verificationCode: string;
		}
	>({
		mutationFn: ({ user, verificationCode }: { user: CognitoUser; verificationCode: string }) =>
			Auth.verifyUserAttributeSubmit(user, attr, verificationCode)
	});

	return { verifyUserAttribute, verifyUserAttributeSubmit };
};

export default useVerifyUserAttrUpdate;
