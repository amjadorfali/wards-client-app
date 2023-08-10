import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardRouteGuard from './DashboardRouteGuard';
import DummyPage from 'modules/Root/Pages/DummyPage/DummyPage';
import NavMenu from './components/NavMenu';
import { Grid, Link, Paper, Typography } from '@mui/material';
import { Help as HelpIcon } from '@mui/icons-material';
import useChooseTeam from './hooks/useChooseTeam';
import { COMPANY_EMAIL } from 'config/literals';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const Home: React.FC = () => {
	useChooseTeam();

	return (
		<>
			<NavMenu>
				<Suspense fallback={<DummyPage loadOnly />}>
					<DashboardRouteGuard>
						<Outlet />
					</DashboardRouteGuard>
				</Suspense>

				<Grid container alignContent={'flex-end'} justifyContent={'center'} item xs={12} my={5}>
					<Grid gap={2} item component={Paper} display={'flex'} justifyContent={'center'} alignItems={'center'} p={3}>
						<HelpIcon />
						<Typography paragraph m={0}>
							Need help? Let us know at{' '}
							<Link sx={{ fontSize: 'inherit' }} href={`mailto:${COMPANY_EMAIL}`}>
								{COMPANY_EMAIL}
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
