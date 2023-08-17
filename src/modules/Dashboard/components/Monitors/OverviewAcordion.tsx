import { Chip, CircularProgress, Grid, Paper, Typography, useTheme } from '@mui/material';
import { formatDistance } from 'date-fns';
import { HealthCheckOverview } from 'modules/Dashboard/queries/useGetMonitorOverview';
import React from 'react';
import { HealthCheck } from 'utils/interfaces';

const OverviewAccordion: React.FC<{ monitorOverview?: HealthCheckOverview; fetchedData: boolean; monitorDetails?: HealthCheck }> = ({
	monitorOverview,
	fetchedData,
	monitorDetails
}) => {
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

				{fetchedData ? (
					<Typography component={Grid} gap={1} alignItems={'flex-end'} container item variant="h3">
						<Chip
							sx={{ p: 1 }}
							label={
								monitorDetails?.enabled
									? typeof monitorOverview?.status?.code === 'number'
										? monitorOverview?.status?.code === 1
											? 'Healthy'
											: 'Failing'
										: 'Pending'
									: 'Paused'
							}
							color={
								typeof monitorOverview?.status?.code === 'number' && monitorDetails?.enabled
									? monitorOverview?.status?.code === 1
										? 'success'
										: 'error'
									: 'warning'
							}
						/>
						{typeof monitorOverview?.status?.code === 'number' && (
							<Typography component={Grid} variant="subtitle2" fontWeight={300} item>
								for{' '}
								{formatDistance(
									new Date(),
									new Date(monitorDetails?.enabled ? monitorOverview?.status?.startTime : monitorOverview.status.endTime ?? 0)
								)}
							</Typography>
						)}
					</Typography>
				) : (
					<CircularProgress color="inherit" />
				)}
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
					Uptime
				</Typography>

				<Grid item xs={12} gap={1} alignItems={'flex-end'} container>
					<Typography sx={{ ...theme.typography.h2 }} component={Grid} item xs={12} sm={'auto'}>
						{fetchedData ? `${monitorOverview?.uptime ?? '-'} %` : <CircularProgress color="inherit" />}
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
						{fetchedData ? `${monitorOverview?.performance ?? '-'} ms` : <CircularProgress color="inherit" />}
					</Typography>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default OverviewAccordion;
