import { Chip, Grid, Paper, Typography, useTheme } from '@mui/material';
import { formatDistance } from 'date-fns';
import { HealthCheckOverview } from 'modules/Dashboard/queries/useGetMonitorOverview';
import React from 'react';

const OverviewAccordion: React.FC<{ monitorOverview?: HealthCheckOverview }> = ({ monitorOverview }) => {
	const theme = useTheme();

	return (
		<Grid container justifyContent={'space-between'} gap={1}>
			<Grid
				container
				item
				xs={12}
				sm={5}
				lg={3.75}
				elevation={12}
				component={Paper}
				sx={{ p: { xs: 1, sm: 3 }, minHeight: { xs: '7rem', md: 0 } }}
				gap={1}
			>
				<Typography component={Grid} item xs={12} variant="subtitle1">
					Status
				</Typography>

				<Typography component={Grid} gap={1} alignItems={'flex-end'} container item variant="h3">
					<Chip
						sx={{ p: 1 }}
						label={monitorOverview?.status?.code === 1 ? 'Healthy' : 'Failing'}
						color={monitorOverview?.status?.code === 1 ? 'success' : 'error'}
					/>
					{/* FIXME: If paused, need to tackle this and show EndTime as well */}
					<Typography component={Grid} variant="subtitle2" fontWeight={300} item>
						for {formatDistance(new Date(), new Date(monitorOverview?.status?.startTime ?? 0))}
					</Typography>
				</Typography>
			</Grid>

			{/* <Grid
				container
				item
				xs={5.5}
				sm={5}
				lg={3.75}
				xl={2.75}
				elevation={12}
				component={Paper}
				sx={{ p: { xs: 1, sm: 3 }, minHeight: { xs: '7rem', md: 0 } }}
				gap={1}
			>
				<Typography component={Grid} item xs={12} variant="subtitle1">
					Last check
				</Typography>

				<Grid item xs={12} gap={1} alignItems={'flex-end'} container>
					<Typography sx={{ ...theme.typography.h2 }} component={Grid} item xs={12} sm={'auto'}>
						2
					</Typography>
					<Typography component={Grid} variant="subtitle2" fontWeight={300} item xs={12} sm={'auto'}>
						min ago
					</Typography>
				</Grid>
			</Grid> */}

			<Grid
				container
				item
				xs={5.5}
				sm={5}
				lg={3.75}
				elevation={12}
				component={Paper}
				sx={{ p: { xs: 1, sm: 3 }, minHeight: { xs: '7rem', md: 0 } }}
				gap={1}
			>
				<Typography component={Grid} item xs={12} variant="subtitle1">
					Uptime
				</Typography>

				<Grid item xs={12} gap={1} alignItems={'flex-end'} container>
					<Typography sx={{ ...theme.typography.h2 }} component={Grid} item xs={12} sm={'auto'}>
						{monitorOverview?.uptime ?? '-'} %
					</Typography>
				</Grid>
			</Grid>

			<Grid
				container
				item
				xs={5.5}
				sm={5}
				lg={3.75}
				elevation={12}
				component={Paper}
				sx={{ p: { xs: 1, sm: 3 }, minHeight: { xs: '7rem', md: 0 } }}
				gap={1}
			>
				<Typography component={Grid} item xs={12} variant="subtitle1">
					Performance
				</Typography>

				<Grid item xs={12} gap={1} alignItems={'flex-end'} container>
					<Typography sx={{ ...theme.typography.h2 }} component={Grid} item xs={12} sm={'auto'}>
						{monitorOverview?.performance ?? '-'} ms
					</Typography>
				</Grid>
			</Grid>
			{/* <Grid
				container
				item
				xs={5.5}
				sm={5}
				lg={3.75}
				xl={2.75}
				elevation={12}
				component={Paper}
				sx={{ p: { xs: 1, sm: 3 }, minHeight: { xs: '7rem', md: 0 } }}
				gap={1}
			>
				<Typography component={Grid} item xs={12} variant="subtitle1">
					Alerts
				</Typography>

				<Grid item xs={12} gap={1} alignItems={'flex-end'} container>
					<Typography sx={{ ...theme.typography.h2 }} item component={Grid} xs={12} sm={'auto'}>
						None
					</Typography>
					<Typography component={Grid} variant="subtitle2" fontWeight={300} item xs={12} sm={'auto'}>
						24 Hours
					</Typography>
				</Grid>
			</Grid> */}
		</Grid>
	);
};

export default OverviewAccordion;
