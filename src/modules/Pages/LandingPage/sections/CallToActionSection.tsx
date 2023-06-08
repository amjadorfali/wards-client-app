import React from 'react';
import { Button, Grid, Typography } from '@mui/material';

export const CallToActionSection: React.FC = () => {
	return (
		<Grid py={15} gap={5} container textAlign={'center'} justifyContent={'center'} alignContent={'center'}>
			<Typography variant={'h3'} component={Grid} item xs={12}>
				Ready to get started?
			</Typography>
			<Typography variant={'subtitle1'} color={'text.primary'} component={Grid} item xs={12}>
				Faster than free analytics tools. Access to all your data, with respect to the privacy of your users.
			</Typography>

			<Grid item container xs={4} justifyContent={'center'} gap={2} alignContent={'center'}>
				<Button variant="contained" size="large">
					Get started
				</Button>
				<Button variant="outlined" size="large">
					Book a demo
				</Button>
			</Grid>
		</Grid>
	);
};

export default CallToActionSection;
