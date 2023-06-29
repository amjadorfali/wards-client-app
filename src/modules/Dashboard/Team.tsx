import React, { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useAuthStore } from 'stores/auth.store';

export type TeamParams = {
	teamId: string;
};
const Team: React.FC = () => {
	const params = useParams<TeamParams>();
	const authStore = useAuthStore();

	useEffect(() => {
		//FIXME: What if the teamId from params doesn't exist - needs fixing
		authStore.setActiveTeam(Number(params.teamId));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params.teamId]);

	return <Outlet />;
};
export default Team;
