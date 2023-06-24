import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import { Button, Typography } from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
const MonitorDetails: React.FC = () => {
	const { monitorId } = useParams<{ monitorId: string }>();

	return (
		<>
			<Button component={RouterLink} to={`../`} startIcon={<ArrowBackIcon />}>
				Monitors
			</Button>
			<Typography variant="h1">Details here {monitorId}</Typography>
		</>
	);
};
export default MonitorDetails;
