import { useMutation } from '@tanstack/react-query';
import axiosInstance from 'services/api';

interface CreateTeamOptions {
	teamName: string;
	userId: string;
}
const useCreateTeam = () => {
	return useMutation({
		mutationFn: ({ teamName, userId }: CreateTeamOptions) =>
			axiosInstance.post('api/team/', {
				teamName,
				userId
			})
	});
};
export default useCreateTeam;
