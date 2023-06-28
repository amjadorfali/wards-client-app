import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardRouteGuard from './DashboardRouteGuard';
import DummyPage from 'modules/Root/Pages/DummyPage/DummyPage';
import NavMenu from './components/NavMenu';
import { Grid, Link, Paper, Typography } from '@mui/material';
import { Help as HelpIcon } from '@mui/icons-material';

const Home: React.FC = () => {
	return (
		<>
			<NavMenu>
				<Suspense fallback={<DummyPage loadOnly />}>
					<DashboardRouteGuard>
						<Outlet />
					</DashboardRouteGuard>
				</Suspense>

				<Grid container alignContent={'center'} justifyContent={'center'} my={5}>
					<Grid gap={2} item component={Paper} display={'flex'} justifyContent={'center'} alignItems={'center'} p={3}>
						<HelpIcon />
						<Typography paragraph m={0}>
							Need help? Let us know at{' '}
							<Link sx={{ fontSize: 'inherit' }} href="mailto:remote.ops.general@gmail.com">
								remote.ops.general@gmail.com
							</Link>
						</Typography>
					</Grid>
				</Grid>
				<br />
			</NavMenu>
		</>
	);
};

export default Home;
