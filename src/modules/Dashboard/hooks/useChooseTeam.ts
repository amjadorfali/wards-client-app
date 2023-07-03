import useGetCurrentUser from 'modules/Root/Pages/Auth/queries/useGetCurrentUser';
import { useEffect } from 'react';
import { useAuthStore } from 'stores/auth.store';

const useChooseTeam = () => {
	const authStore = useAuthStore();
	const { internalUserQuery, currentTeam } = useGetCurrentUser();
	useEffect(() => {
		if (internalUserQuery.isSuccess && !currentTeam?.uuid) {
			const teamId = [...(internalUserQuery.data.data.teams || [])].shift()?.uuid;
			if (teamId) authStore.setActiveTeam(teamId);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [internalUserQuery.isSuccess]);
};
export default useChooseTeam;