import { Auth } from '@aws-amplify/auth';
import { useMutation } from '@tanstack/react-query';
import useGetCurrentUserInfo from '../queries/useGetCognitoCurrentUserInfo';
import { AuthError } from '@aws-amplify/auth/lib-esm/Errors';

interface ChangePasswordParams {
	oldPassword: string;
	newPassword: string;
}

const useChangePassword = () => {
	const { data } = useGetCurrentUserInfo();

	return useMutation<'SUCCESS', AuthError, ChangePasswordParams, unknown>({
		mutationFn: ({ oldPassword, newPassword }: ChangePasswordParams) => Auth.changePassword(data, oldPassword, newPassword)
	});
};
export default useChangePassword;
