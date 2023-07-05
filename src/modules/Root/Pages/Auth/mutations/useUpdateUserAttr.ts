import { Auth } from '@aws-amplify/auth';
import { AuthError } from '@aws-amplify/auth/lib-esm/Errors';
import { useMutation } from '@tanstack/react-query';
import { CustomCognitoUser } from 'utils/interfaces';
import useGetCurrentAuthUser from '../queries/useGetCurrentAuthUser';

const useUpdateUserAttr = () => {
	const { data } = useGetCurrentAuthUser();
	return useMutation<
		string,
		AuthError,
		{
			email: string;
			phoneNumber?: string | undefined;
		}
	>({
		mutationFn: (attr: CustomCognitoUser['attributes']) => Auth.updateUserAttributes(data, attr)
	});
};

export default useUpdateUserAttr;
