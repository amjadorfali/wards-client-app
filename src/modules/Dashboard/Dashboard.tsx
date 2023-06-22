import React from 'react';
import useSignOut from '../Root/Pages/Auth/mutations/useSignOut';
import useGetCurrentSession from '../Root/Pages/Auth/queries/useGetCurrentSession';
import useGetCurrentUserInfo from '../Root/Pages/Auth/queries/useGetCurrentUserInfo';
const Dashboard: React.FC = () => {
	const signOut = useSignOut();
	const currentSession = useGetCurrentSession();
	const currentUser = useGetCurrentUserInfo();

	const handleSignOut = () => {
		signOut.mutate(undefined, {
			onSuccess: () => {
				currentSession.refetch();
				currentUser.refetch();
			}
		});
	};

	handleSignOut();
	return <h1>Here's the Dashboard nigga</h1>;
};
export default Dashboard;
