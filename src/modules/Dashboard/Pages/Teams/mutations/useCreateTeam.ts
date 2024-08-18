import { useMutation } from '@tanstack/react-query';

interface CreateTeamOptions {
	teamName: string;
	userId: string;
}
const useCreateTeam = () => {
	return useMutation({
		mutationFn: ({ teamName, userId }: CreateTeamOptions) => Promise.resolve(() => ({ teamName, userId }))
	});
};
export default useCreateTeam;
