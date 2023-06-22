import { Auth } from '@aws-amplify/auth';
import { useMutation } from '@tanstack/react-query';
import useGetCurrentAuthUser from '../queries/useGetCurrentUserInfo';
import { AuthError } from '@aws-amplify/auth/lib-esm/Errors';

interface ChangePasswordParams {
	oldPassword: string;
	newPassword: string;
}

const useChangePassword = () => {
	const { data } = useGetCurrentAuthUser();

	return useMutation<'SUCCESS', AuthError, ChangePasswordParams, unknown>({
		mutationFn: ({ oldPassword, newPassword }: ChangePasswordParams) => Auth.changePassword(data, oldPassword, newPassword)
	});
};
export default useChangePassword;
