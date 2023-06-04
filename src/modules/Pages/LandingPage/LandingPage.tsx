import React from 'react';
import { Button, Grid, Typography, styled, useTheme } from '@mui/material';
import { Navbar } from 'modules/Pages/LandingPage/Navbar';
import useEchartsTheme from 'config/echarts/useEchartsTheme';

const InfiniteTime = React.lazy(() => import('components/charts/InfiniteTime'));

const LandingPage: React.FC = () => {
	const theme = useTheme();

	useEchartsTheme();
	return (
		<>
			<Navbar />

			<Grid
				container
				sx={{
					minHeight: '100vh',
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
						<Typography variant="h1" color={'secondary'} align="center" fontWeight={700}>
							Analytics for <br />
							<StyledTitleSpan>Developers</StyledTitleSpan>
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography color={'text.secondary'} fontSize={20} variant="body1" align="center">
							Easy to install. Unlimited power.
						</Typography>
					</Grid>
					<Grid item xs={12} container justifyContent={'center'}>
						<Button variant="contained" color="primary" size="medium" sx={{ textTransform: 'capitalize' }}>
							Get Started
						</Button>
					</Grid>
				</Grid>

				<Grid container item xs={12} justifyContent={'center'}>
					<Grid item xs={11}>
						<InfiniteTime ReactChartsComponentProps={{ style: { height: '35rem' } }} />
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

export default LandingPage;

const StyledTitleSpan = styled('span')(({ theme }) => ({
	color: theme.palette.primary.main
}));
