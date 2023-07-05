import { useMutation } from '@tanstack/react-query';
import axiosInstance from 'services/api';

interface EditTeamOptions {
	teamName: string;
	teamdId: string;
}
const useEditTeam = () => {
	return useMutation({
		mutationFn: ({ teamName, teamdId }: EditTeamOptions) => axiosInstance.put('api/team/', { teamName, teamdId })
	});
};

export default useEditTeam;
