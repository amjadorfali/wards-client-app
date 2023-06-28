import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
interface Monitor {
	id: string;
	name: string;
	url: string;
	createdAt: string;
	updatedAt: string;
}

import { ReactComponent as UserInterface } from 'assets/user-interface.svg';
import { RoutesConfig } from 'config/Routes/routeConfig';
const Dashboard: React.FC = () => {
	const [monitors] = React.useState<Monitor[]>([]);

	return (
		<>
			{monitors.length ? (
				monitors.map((monitor) => <>{monitor.id}</>)
			) : (
				<Grid minHeight={'60dvh'} container alignContent={'center'} justifyContent={'center'}>
					<Grid item xs={12} md={6} lg={5} xl={4}>
						<Typography variant={'h1'}>Create your first monitor</Typography>
						<Typography paragraph>We will keep an eye on your server and call or message you when it goes down.</Typography>

						<Button component={RouterLink} to={RoutesConfig.new} variant="contained" sx={{ textTransform: 'capitalize' }}>
							Create monitor
						</Button>
					</Grid>
					<Grid item xs={12} md={6} lg={5} xl={4}>
						<UserInterface width={'100%'} height={'100%'} />
					</Grid>
				</Grid>
			)}
		</>
	);
};
export default Dashboard;
