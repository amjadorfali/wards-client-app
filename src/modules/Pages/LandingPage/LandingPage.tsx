import React from 'react';
import { Button, Grid, Typography, styled, useTheme } from '@mui/material';
import { Navbar } from 'modules/Pages/LandingPage/Navbar';

const LandingPage: React.FC = () => {
	const theme = useTheme();
	return (
		<>
			<Navbar />

			<Grid
				container
				sx={{
					minHeight: '100vh',
					background: theme.palette.customBg.gradient,
					//Responsive layout
					pt: { xs: 10, md: 0 },
					pb: { md: 10 },
					alignContent: { md: 'center' }
				}}
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
			</Grid>
		</>
	);
};

export default LandingPage;

const StyledTitleSpan = styled('span')(({ theme }) => ({
	color: theme.palette.primary.main
}));
