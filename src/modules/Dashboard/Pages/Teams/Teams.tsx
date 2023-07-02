import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import TeamsTable from '../../components/TeamsTable';
import { RoutesConfig } from 'config/Routes/routeConfig';
import { Link as RouterLink } from 'react-router-dom';

const Teams: React.FC = () => {
	return (
		<Grid container minHeight={'40dvh'} alignContent={'center'} sx={{ justifyContent: 'center' }} gap={5}>
			<Grid
				item
				container
				xs={12}
				sx={{ justifyContent: { xs: 'center', sm: 'space-between' } }}
				alignContent={'center'}
				alignItems={'center'}
				flexWrap={'wrap'}
				gap={1}
			>
				<Grid item xs={12} sx={{ display: { xs: 'flex' }, justifyContent: { xs: 'center' } }} sm={2}>
					<Typography variant="h1">Teams</Typography>
				</Grid>
				<Grid item sx={{ display: { xs: 'flex' }, justifyContent: { xs: 'center' } }} sm={2}>
					<Button component={RouterLink} to={RoutesConfig.createTeam} variant="contained" size="medium">
						Create team
					</Button>
				</Grid>
			</Grid>
			<TeamsTable />
		</Grid>
	);
};

export default Teams;
