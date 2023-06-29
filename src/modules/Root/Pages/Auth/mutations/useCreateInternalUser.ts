import { useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { InternalUser } from 'utils/interfaces';

interface CreateUserOptions {
	subId: string;
	email: string;
	teamName: string;
}

const useCreateInternalUser = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return useMutation<AxiosResponse<InternalUser, any>, { errorCode: string }, CreateUserOptions, unknown>({
		mutationFn: ({ email, subId, teamName }: CreateUserOptions) =>
			axios.post<InternalUser>(import.meta.env.VITE_INTERNAL_API_HOST + 'api/user/', {
				email,
				subId,
				teamName
			})
	});
};
export default useCreateInternalUser;
