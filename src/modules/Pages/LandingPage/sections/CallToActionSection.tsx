import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { RoutesConfig } from 'modules/App/App';
import { Link as RouterLink } from 'react-router-dom';

const content = {
	title: "Take Control of Your Application's Performance Today",
	subtitle: 'Sign up now and experience the power of our comprehensive service.',
	callToAction1: { text: 'Get started', link: RoutesConfig.signUp },
	callToAction2: 'Book a demo'
};
export const CallToActionSection: React.FC = () => {
	return (
		<Grid py={15} gap={5} container textAlign={'center'} justifyContent={'center'} alignContent={'center'}>
			<Typography variant={'h3'} component={Grid} item xs={12}>
				{content.title}
			</Typography>
			<Typography color={'text.secondary'} component={Grid} item xs={12}>
				{content.subtitle}
			</Typography>

			<Grid item container xs={4} justifyContent={'center'} gap={2} alignContent={'center'}>
				<Button variant="contained" size="large" component={RouterLink} to={content.callToAction1.link}>
					{content.callToAction1.text}
				</Button>
				<Button variant="outlined" size="large">
					{content.callToAction2}
				</Button>
			</Grid>
		</Grid>
	);
};

export default CallToActionSection;
