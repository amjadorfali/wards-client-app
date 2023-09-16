import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardRouteGuard from './DashboardRouteGuard';
import DummyPage from 'modules/Root/Pages/DummyPage/DummyPage';
import NavMenu from './components/NavMenu';
import { Grid, Link, Paper, Typography } from '@mui/material';
import { Help as HelpIcon, WhatsApp } from '@mui/icons-material';
import useChooseTeam from './hooks/useChooseTeam';
import { COMPANY_EMAIL, COMPANY_PHONE } from 'config/literals';

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

				<Grid alignSelf={'center'} container alignContent={'flex-end'} justifyContent={'center'} item xs={11} md={10} lg={9} my={5}>
					<Grid gap={2} item component={Paper} display={'flex'} justifyContent={'center'} alignItems={'center'} p={3}>
						<HelpIcon />
						<Typography paragraph m={0} textAlign={'center'}>
							Need help? <Link sx={{ fontSize: 'inherit' }} href={`mailto:${COMPANY_EMAIL}`} children="Email" /> /{' '}
							<Link sx={{ fontSize: 'inherit' }} href={`tel:${COMPANY_PHONE}`} children={'Call'} /> us, or send us a message on
							WhatsApp <Link sx={{ fontSize: 'inherit' }} href={`tel:${COMPANY_PHONE}`} children={COMPANY_PHONE} />{' '}
							<WhatsApp color="success" />
						</Typography>
					</Grid>
				</Grid>
				<br />
			</NavMenu>
		</>
	);
};

export default Home;
