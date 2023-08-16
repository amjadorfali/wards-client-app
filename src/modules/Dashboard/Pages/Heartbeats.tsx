import { Grid, Typography } from '@mui/material';
import React from 'react';
import { ReactComponent as UserInterface } from 'assets/user-interface.svg';
import ComingSoon from 'components/ComingSoon';

const Heartbeats: React.FC = () => {
	return (
		<Grid minHeight={'80%'} p={1} container alignContent={'center'} justifyContent={'center'}>
			<Grid item xs={12} md={6} lg={6} container gap={5} direction={'column'}>
				<Typography variant={'h1'}>A heartbeat!</Typography>
				<Typography variant="h3" lineHeight={1.5}>
					Track your CRON jobs and
					<br />
					serverless workers and get alerted if
					<br />
					they don't run correctly. Never lose a
					<br />
					database backup!
				</Typography>

				{/* <Button variant="outlined" sx={{ textTransform: 'capitalize' }}>
					Get notified of the release!
				</Button> */}

				<Grid item container justifyContent={'center'}>
					<ComingSoon />
				</Grid>
				<br />
			</Grid>
			<Grid item xs={12} md={6} lg={6}>
				<UserInterface width={'100%'} height={'100%'} />
			</Grid>
		</Grid>
	);
};

export default Heartbeats;
