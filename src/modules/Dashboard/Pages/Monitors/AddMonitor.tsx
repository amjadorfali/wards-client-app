import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import { Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
const AddMonitor: React.FC = () => {
	return (
		<>
			<Button component={RouterLink} to={`../`} startIcon={<ArrowBackIcon />}>
				Monitors
			</Button>

			<Typography variant="h1">Add Monitors</Typography>
		</>
	);
};
export default AddMonitor;
