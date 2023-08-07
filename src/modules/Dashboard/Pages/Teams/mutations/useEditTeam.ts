import { useMutation } from '@tanstack/react-query';
import axiosInstance from 'services/api';

interface EditTeamOptions {
	teamId: string;
	name: string;
}
const useEditTeam = () => {
	return useMutation({
		mutationFn: ({ name, teamId }: EditTeamOptions) => axiosInstance.put(`api/team/${teamId}`, { name })
	});
};

export default useEditTeam;
