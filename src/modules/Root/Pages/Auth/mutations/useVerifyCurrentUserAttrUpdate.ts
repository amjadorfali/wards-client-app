import { AuthError } from '@aws-amplify/auth/lib-esm/Errors';
import { useMutation } from '@tanstack/react-query';

const useVerifyCurrentUserAttrUpdate = () => {
	const verifyCurrentUserAttribute = useMutation<void, AuthError, void, unknown>({
		mutationFn: () => Promise.resolve()
	});
	const verifyCurrentUserAttributeSubmit = useMutation<string, AuthError, string, unknown>({
		mutationFn: () => Promise.resolve('')
	});

	return { verifyCurrentUserAttribute, verifyCurrentUserAttributeSubmit };
};

export default useVerifyCurrentUserAttrUpdate;
