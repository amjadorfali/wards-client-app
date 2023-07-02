import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import axiosInstance from 'services/api';
import { InternalUser } from 'utils/interfaces';

interface CreateUserOptions {
	teamName: string;
	uuid: string;
	email: string;
}

const useCreateInternalUser = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return useMutation<AxiosResponse<InternalUser, any>, { errorCode: string }, CreateUserOptions, unknown>({
		mutationFn: ({ teamName, email, uuid }: CreateUserOptions) =>
			axiosInstance.post<InternalUser>('api/me/', { teamName, email, uuid })
	});
};
export default useCreateInternalUser;
