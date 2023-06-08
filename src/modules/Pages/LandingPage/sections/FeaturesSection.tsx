import { Avatar, Button, Grid, Theme, Typography, useTheme } from '@mui/material';
import React from 'react';

import TroubleshootOutlinedIcon from '@mui/icons-material/TroubleshootOutlined';

const ContentConfig = {
	title: (theme: Theme) => (
		<>
			Powerful
			<Typography variant="body1" sx={{ ...theme.typography.h2 }} display={'inline'} color="primary.main">
				{' '}
				reporting
			</Typography>
		</>
	),
	subtitle: [
		'We use the latest software to power your data.',
		'Used by the biggest enterprises today, our stack has stood the test of time.'
	],
	button: 'Get Started',

	list: [
		{
			title: 'Powerful reporting',
			subtitle:
				'We use the latest software to power your data. Used by the biggest enterprises today, our stack has stood the test of time.'
		},
		{
			title: 'Awesome features',
			subtitle:
				'We use the latest software to power your data. Used by the biggest enterprises today, our stack has stood the test of time.'
		},
		{
			title: 'here we come',
			subtitle:
				'We use the latest software to power your data. Used by the biggest enterprises today, our stack has stood the test of time.'
		},
		{
			title: 'Almost there',
			subtitle:
				'We use the latest software to power your data. Used by the biggest enterprises today, our stack has stood the test of time.'
		}
	]
};
const FeaturesSection: React.FC = () => {
	const theme = useTheme();
	return (
		<Grid container pt={25} pb={10}>
			<Grid item container justifyContent={'center'} gap={3} alignContent={'center'}>
				<Grid item xs={12} sm={4} md={3}>
					<TroubleshootOutlinedIcon
						sx={{
							width: '100%',
							height: { xs: '40%', md: '30%' },
							position: 'sticky',
							top: '10%',
							fill: theme.palette.primary.main
						}}
					/>
				</Grid>
				<Grid container item xs={10} sm={4} lg={3} xl={2} justifyContent={'center'} gap={30} alignContent={'center'}>
					<Grid item container gap={2}>
						<Typography variant="h2">{ContentConfig.title(theme)}</Typography>
						<Typography variant="subtitle1">
							{ContentConfig.subtitle.map((text) => (
								<React.Fragment key={text}>
									{text}
									<br />
								</React.Fragment>
							))}
						</Typography>
						<Button variant="contained" size="large" color="primary" sx={{ textTransform: 'capitalize' }}>
							{ContentConfig.button}
						</Button>
					</Grid>

					{ContentConfig.list.map(({ title, subtitle }) => (
						<Grid key={title} item container gap={2} wrap={'wrap'}>
							<Grid item xs={12}>
								<Avatar sx={{ bgcolor: theme.palette.primary.main, width: '3rem', height: '3rem' }}>
									<TroubleshootOutlinedIcon sx={{ width: '2rem', height: '2rem' }} />
								</Avatar>
							</Grid>

							<Typography variant="h4">{title}</Typography>

							<Typography variant="subtitle2">{subtitle}</Typography>
						</Grid>
					))}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default FeaturesSection;
