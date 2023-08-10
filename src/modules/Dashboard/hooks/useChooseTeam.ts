import useGetCurrentUser from 'modules/Root/Pages/Auth/queries/useGetCurrentUser';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from 'stores/auth.store';

const useChooseTeam = () => {
	const authStore = useAuthStore();
	const { teamId } = useParams<{ teamId: string }>();
	const { internalUserQuery, currentTeam } = useGetCurrentUser();
	const navigate = useNavigate();
	// TODO: Test this shit really well
	// This is checking if a team wasn't found in the useMemo, and if there isn't any team
	// to show for the teamId in the params.
	// If not, it finds the team in the cache, or the first team created by user
	// If everything else fails, we throw an error since there's no team for this user
	useEffect(() => {
		const selectedTeam = internalUserQuery.data?.data?.teams?.find((team) => team.uuid === teamId);
		// validate currentTeam
		if (internalUserQuery.isSuccess && !currentTeam?.uuid && !selectedTeam) {
			const cachedTeamId = authStore.activeTeam;
			const cachedTeam = internalUserQuery.data?.data?.teams?.find((team) => team.uuid === cachedTeamId);
			if (cachedTeam?.uuid) {
				navigate(`../${cachedTeam.uuid}`);
			} else {
				const firstTeamIdForUser = [...(internalUserQuery.data.data.teams || [])].shift()?.uuid;
				const firstTeamForUser = internalUserQuery.data?.data?.teams?.find((team) => team.uuid === firstTeamIdForUser);
				if (firstTeamForUser?.uuid) {
					navigate(`../${firstTeamForUser.uuid}`);
				} else {
					throw new Error('No team found for user');
				}
			}
		}

		if (selectedTeam && currentTeam?.uuid) {
			authStore.setActiveTeam(selectedTeam.uuid);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [internalUserQuery.isSuccess, teamId]);
};
export default useChooseTeam;
