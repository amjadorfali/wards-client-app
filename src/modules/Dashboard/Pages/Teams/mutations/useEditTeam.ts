import { useMutation } from '@tanstack/react-query';

interface EditTeamOptions {
	teamId: string;
	name: string;
}
const useEditTeam = () => {
	return useMutation({
		mutationFn: ({ name, teamId }: EditTeamOptions) => Promise.resolve(() => ({ name, teamId }))
	});
};

export default useEditTeam;
