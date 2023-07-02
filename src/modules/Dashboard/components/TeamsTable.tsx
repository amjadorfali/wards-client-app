import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useGetCurrentUser from 'modules/Root/Pages/Auth/queries/useGetCurrentUser';
import { Button } from '@mui/material';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0
	}
}));

const TeamsTable: React.FC = () => {
	const { currentUser } = useGetCurrentUser();
	return (
		<TableContainer component={Paper} sx={{ maxWidth: '80dvw' }}>
			<Table sx={{ minWidth: 700 }} aria-label="customized table">
				<TableHead>
					<TableRow>
						<TableCell>Team</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{currentUser.teams?.map((row) => (
						<StyledTableRow key={row.name}>
							<TableCell component="th" scope="row">
								{row.name}
							</TableCell>
							<TableCell align="right">{row.uuid}</TableCell>
							<TableCell align="right">
								<Button>Edit</Button>
							</TableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
export default TeamsTable;
