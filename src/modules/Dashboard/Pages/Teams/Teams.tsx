import { Grid, Typography } from '@mui/material';
import React from 'react';
import TeamsTable from '../../components/TeamsTable';

const Teams: React.FC = () => {
	return (
		<Grid container alignContent={'center'} sx={{ justifyContent: 'center' }} gap={5}>
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
			</Grid>
			<TeamsTable />
		</Grid>
	);
};

export default Teams;
