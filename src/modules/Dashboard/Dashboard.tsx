import React, { Suspense, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import DashboardRouteGuard from './DashboardRouteGuard';
import DummyPage from 'modules/Root/Pages/DummyPage/DummyPage';
import NavMenu from './components/NavMenu';
import { Grid, Link, Paper, Typography } from '@mui/material';
import { Help as HelpIcon } from '@mui/icons-material';
import useChooseTeam from './hooks/useChooseTeam';
import { useAuthStore } from 'stores/auth.store';

export type TeamParams = {
	teamId: string;
};
const Home: React.FC = () => {
	useChooseTeam();

	const params = useParams<TeamParams>();
	const authStore = useAuthStore();

	useEffect(() => {
		authStore.setActiveTeam(params.teamId || '');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params.teamId]);

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
