import * as React from 'react';
// import useGetCurrentUser from 'modules/Root/Pages/Auth/queries/useGetCurrentUser';
import { Button, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { RoutesConfig } from 'config/Routes/routeConfig';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

const issuesRows: GridRowsProp = [
	{ id: 1, uuid: '1', name: '200 OK', edit: 'US' },
	{ id: 2, uuid: '2', name: '200 OK', edit: 'EU' },
	{ id: 3, uuid: '3', name: '200 OK', edit: 'AU' },
	{ id: 4, uuid: '4', name: '200 OK', edit: 'ASIA' },
	{ id: 5, uuid: '5', name: '200 OK', edit: 'US' }
];

const issuesColumns: GridColDef[] = [
	{ field: 'name', headerName: 'Name', minWidth: 200 },
	{ field: 'uuid', headerName: 'ID', minWidth: 250 },
	{
		field: 'empty space',
		headerName: '',
		flex: 1,
		disableColumnMenu: true,
		sortable: false
	},
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
	// const { currentUser } = useGetCurrentUser();
	return (
		<Grid item xs={12} sx={{ minHeight: '50vh', maxHeight: '50vh', width: '100%' }}>
			<DataGrid rows={issuesRows} columns={issuesColumns} />
		</Grid>
	);
};
export default TeamsTable;
