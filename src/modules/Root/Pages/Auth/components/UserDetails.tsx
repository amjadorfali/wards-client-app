import { Button } from '@mui/material';
import React from 'react';
interface Props {
	email: string;
	onSignOut: () => void;
}
const UserDetails: React.FC<Props> = ({ email, onSignOut }) => {
	return (
		<>
			Hello {email.split('@')?.[0]}
			<Button onClick={onSignOut}>Sign out</Button>
		</>
	);
};

export default UserDetails;
