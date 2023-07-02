import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import Ping from 'modules/Dashboard/components/Ping';
import { FlakyOutlined } from '@mui/icons-material';
const MonitorDetails: React.FC = () => {
	const { monitorId } = useParams<{ monitorId: string }>();

	// TODO: Continue on logic for monitors details
	return (
		<Grid container minHeight={'40dvh'} gap={3}>
			<Grid item xs={12}>
				<Button component={RouterLink} to={`../`} startIcon={<ArrowBackIcon />}>
					Monitors
				</Button>
			</Grid>
			<Grid item xs={12} container height={'fit-content'} gap={1}>
				<Grid item alignSelf={'center'}>
					<Ping isSuccess={Number(monitorId) % 2} isInfinite={1} />
				</Grid>

				<Grid item>
					<Typography variant="h1">.com</Typography>
					<Typography mt={1} variant="caption">
						<Typography variant="caption" color={Number(monitorId) % 2 ? 'success.main' : 'error.main'}>
							{Number(monitorId) % 2 ? 'Up' : 'Down'}
						</Typography>{' '}
						. Checked every 3 minutes
					</Typography>
				</Grid>
			</Grid>

			<Grid container item xs={12} height={'fit-content'}>
				<Button variant="text" component={RouterLink} to="" startIcon={<FlakyOutlined />}>
					Send test alert
				</Button>

				<Button variant="text" component={RouterLink} to="" startIcon={<FlakyOutlined />}>
					Pause this monitor
				</Button>
				<Button variant="text" component={RouterLink} to="" startIcon={<FlakyOutlined />}>
					Configure
				</Button>
			</Grid>

			<Grid container item xs={12} component={Paper} p={3} gap={1}>
				<Typography component={Grid} item xs={12} variant="caption">
					Currently {Number(monitorId) % 2 ? 'up' : 'down'} for
				</Typography>

				<Typography component={Grid} item xs={12} variant="h2">
					1 day 18 hrs 12 mins
				</Typography>
			</Grid>

			<Grid container item xs={12} component={Paper} p={3} gap={1}>
				<Typography component={Grid} item xs={12} variant="caption">
					Last checked at
				</Typography>

				<Typography component={Grid} item xs={12} variant="h2">
					2 minutes ago
				</Typography>
			</Grid>
		</Grid>
	);
};
export default MonitorDetails;
