import React from 'react';
import { ReactComponent as StreamingIcon } from 'assets/streaming.svg';
import { Grid, Typography } from '@mui/material';

const SummarySection: React.FC = () => {
	return (
		<>
			<Grid pt={20} container justifyContent={'center'} alignContent={'center'}>
				<Grid item xs={12} md={12} textAlign={'center'}>
					<Typography variant="h2">
						Empower your team <br /> with good data
					</Typography>
					<Typography variant="subtitle1" px={3} pt={3}>
						We collect events from your web & mobile apps and provide <br /> a complete data toolkit for every team in your company.
					</Typography>
				</Grid>
				<Grid container item xs={10} md={8} justifyContent={'center'}>
					<StreamingIcon height={'100%'} width={'100%'} />
				</Grid>
			</Grid>
		</>
	);
};

export default SummarySection;
