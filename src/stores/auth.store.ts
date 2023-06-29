import { User } from 'utils/interfaces';
import { create } from 'zustand';

const ACTIVE_TEAM_ID_KEY = 'ACTIVE_TEAM_ID';

interface AuthStore {
	activeTeam?: number | null;
	setActiveTeam: (teamId: number) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
	activeTeam: Number(localStorage.getItem(ACTIVE_TEAM_ID_KEY)),
	setActiveTeam(teamId) {
		set({ activeTeam: teamId });
		localStorage.setItem(ACTIVE_TEAM_ID_KEY, String(teamId));
	}
}));

export const getTeamId = (user?: Partial<User>) => {
	return useAuthStore.getState().activeTeam || user?.teams?.[0]?.id || 0;
};
