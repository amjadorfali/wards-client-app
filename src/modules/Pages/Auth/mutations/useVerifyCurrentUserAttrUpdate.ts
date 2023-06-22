import { Auth } from '@aws-amplify/auth';
import { AuthError } from '@aws-amplify/auth/lib-esm/Errors';
import { useMutation } from '@tanstack/react-query';
import { User } from 'utils/interfaces';

const useVerifyCurrentUserAttrUpdate = (attr: keyof User['attributes']) => {
	const verifyCurrentUserAttribute = useMutation<void, AuthError, void, unknown>({
		mutationFn: () => Auth.verifyCurrentUserAttribute(attr)
	});
	const verifyCurrentUserAttributeSubmit = useMutation<string, AuthError, string, unknown>({
		mutationFn: (verificationCode: string) => Auth.verifyCurrentUserAttributeSubmit(attr, verificationCode)
	});

	return { verifyCurrentUserAttribute, verifyCurrentUserAttributeSubmit };
};

export default useVerifyCurrentUserAttrUpdate;
