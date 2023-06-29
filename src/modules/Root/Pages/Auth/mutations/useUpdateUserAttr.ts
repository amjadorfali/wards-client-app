import { Auth, CognitoUser } from '@aws-amplify/auth';
import { AuthError } from '@aws-amplify/auth/lib-esm/Errors';
import { useMutation } from '@tanstack/react-query';
import { CustomCognitoUser } from 'utils/interfaces';

const useUpdateUserAttr = (user: CognitoUser) => {
	return useMutation<
		string,
		AuthError,
		{
			email: string;
			phoneNumber?: string | undefined;
		}
	>({
		mutationFn: (attr: CustomCognitoUser['attributes']) => Auth.updateUserAttributes(user, attr)
	});
};

export default useUpdateUserAttr;
