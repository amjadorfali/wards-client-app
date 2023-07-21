import { Chip, Grid, Paper, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
const OverviewAccordion: React.FC = () => {
	const { monitorId } = useParams<{ monitorId: string }>();
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
						label={Number(monitorId) % 2 ? 'Healthy' : 'Failing'}
						color={Number(monitorId) % 2 ? 'success' : 'error'}
					/>
					<Typography component={Grid} variant="subtitle2" fontWeight={300} item>
						for 8 days
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
						100%
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
						181 ms
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
