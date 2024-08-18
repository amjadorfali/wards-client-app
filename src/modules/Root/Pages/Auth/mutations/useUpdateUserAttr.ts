import { AuthError } from '@aws-amplify/auth/lib-esm/Errors';
import { useMutation } from '@tanstack/react-query';

const useUpdateUserAttr = () => {
	return useMutation<
		string,
		AuthError,
		{
			email: string;
			phoneNumber?: string | undefined;
		}
	>({
		mutationFn: () => Promise.resolve('')
	});
};

export default useUpdateUserAttr;
