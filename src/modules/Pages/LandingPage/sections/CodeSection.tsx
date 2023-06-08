import React from 'react';

import DemoCodeBlock from 'components/docs/DemoCodeBlock';
import DemoBashBlock from 'components/docs/DemoBashBlock';
import { Grid, Typography, useTheme } from '@mui/material';

const CodeSection: React.FC = () => {
	const theme = useTheme();
	return (
		<Grid
			container
			justifyContent={'center'}
			gap={10}
			alignContent={'flex-end'}
			pt={20}
			sx={{
				background: theme.palette.customBg.tertiaryGradient
			}}
		>
			<Grid item xs={11} sm={5} lg={3} container sx={{}} gap={3}>
				<Typography variant="h2" color={'text.secondary'}>
					Our features at your
					<Typography variant="body1" sx={{ ...theme.typography.h2 }} display={'inline'} color={'tertiary'}>
						{' '}
						fingertips.
					</Typography>
				</Typography>
				<Typography variant="subtitle1">
					Our Client is a query builder that composes the way you think and gets auto-generated.
				</Typography>

				<Grid item xs={11} md={12}>
					<DemoBashBlock />
				</Grid>
			</Grid>
			<Grid item xs={11} sm={5} lg={3}>
				<DemoCodeBlock />
			</Grid>
		</Grid>
	);
};

export default CodeSection;
