import * as React from 'react';
// import useGetCurrentUser from 'modules/Root/Pages/Auth/queries/useGetCurrentUser';
import { Button, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { RoutesConfig } from 'config/Routes/routeConfig';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import useGetCurrentUser from 'modules/Root/Pages/Auth/queries/useGetCurrentUser';

const issuesColumns: GridColDef[] = [
	{ field: 'name', headerName: 'Team', minWidth: 200 },
	{
		field: 'empty space',
		headerName: '',
		flex: 1,
		disableColumnMenu: true,
		sortable: false,
		filterable: false,
		hideable: false
	},
	{ field: 'monitors-count', headerName: 'Monitors', minWidth: 150 },

	{
		field: 'edit',
		headerName: '',
		minWidth: 150,
		disableColumnMenu: true,
		sortable: false,
		renderCell: (params) => {
			return (
				<Button component={RouterLink} to={`${RoutesConfig.editTeam}/${params.value}`} variant="outlined" color="secondary">
					Configure
				</Button>
			);
		}
	}
];

const TeamsTable: React.FC = () => {
	const { currentUser } = useGetCurrentUser();

	const rows = React.useMemo<GridRowsProp>(
		() =>
			currentUser?.teams?.map((team) => ({
				'monitors-count': team.healthCheckUsage,
				name: team.name,
				edit: team.uuid,
				id: team.uuid
			})) || [],
		[currentUser?.teams]
	);
	return (
		<Grid item xs={12} sx={{ minHeight: '50vh', maxHeight: '50vh', width: '100%' }}>
			<DataGrid rows={rows} columns={issuesColumns} />
		</Grid>
	);
};
export default TeamsTable;
