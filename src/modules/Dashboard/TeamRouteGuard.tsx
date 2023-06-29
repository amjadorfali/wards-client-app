import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from 'stores/auth.store';

const TeamRouteGuard: React.FC = () => {
	const authStore = useAuthStore();
	return <Navigate to={String(authStore.activeTeam || 0)} replace />;
};

export default TeamRouteGuard;
