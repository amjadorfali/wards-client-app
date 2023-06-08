import React, { Suspense } from 'react';
import { Button, Grid, Paper, Typography, useTheme } from '@mui/material';
const InfiniteTime = React.lazy(() => import('components/charts/InfiniteTime'));
const HeroSection: React.FC = () => {
	const theme = useTheme();

	return (
		<Grid
			container
			sx={{
				minHeight: '80vh',
				background: theme.palette.customBg.gradient,
				position: 'relative',
				//Responsive layout
				pt: { xs: 15, md: 10 },
				alignContent: { md: 'center' }
			}}
			gap={15}
		>
			<Grid container item xs={12} justifyContent={'center'} height={'fit-content'} gap={3}>
				<Grid item xs={12}>
					<Typography variant="h1" color={'text.secondary'} align="center">
						Analytics for <br />
						<Typography variant="body1" sx={{ ...theme.typography.h1 }} display={'inline'} color="primary.main">
							Developers
						</Typography>
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="subtitle1" align="center">
						Easy to install. Unlimited power.
					</Typography>
				</Grid>
				<Grid item xs={12} container justifyContent={'center'}>
					<Button variant="contained" color="primary" size="large" sx={{ textTransform: 'capitalize' }}>
						Get Started
					</Button>
				</Grid>
			</Grid>

			<Grid container item xs={12} justifyContent={'center'}>
				<Grid
					component={Paper}
					elevation={10}
					item
					xs={12}
					md={7}
					sx={{ px: 2, mb: -7, background: theme.palette.customBg.primary, minHeight: '35rem' }}
				>
					<Suspense fallback={<>Hey there, still loading...</>}>
						<InfiniteTime ReactChartsComponentProps={{ style: { height: '35rem' } }} />
					</Suspense>
				</Grid>
			</Grid>
		</Grid>
	);
};
export default HeroSection;
