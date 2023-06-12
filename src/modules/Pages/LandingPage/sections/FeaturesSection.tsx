import { Avatar, Button, Grid, Theme, Typography, useTheme } from '@mui/material';
import React, { useEffect } from 'react';

import TroubleshootOutlinedIcon from '@mui/icons-material/TroubleshootOutlined';
import { useAnimate, useInView } from 'framer-motion';

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

const elements = {
	title: 'title',
	subtitle: 'subtitle',
	listItem: 'listItem',
	avatar: 'avatar'
};
const FeaturesSection: React.FC = () => {
	const theme = useTheme();

	const [scope, animate] = useAnimate<HTMLDivElement>();
	const inView = useInView(scope, { once: true, margin: '0px 0px -35% 0px' });

	useEffect(() => {
		if (inView) {
			animate(
				Object.keys(elements)
					.filter((id) => id !== elements.avatar)
					.map((id) => [`#${id}`, { opacity: 1, y: [100, 0] }, { duration: 0.7, at: '<' }])
			);

			animate(`#${elements.avatar}`, { opacity: 1, scale: [0, 1] }, { duration: 0.7 });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inView]);
	return (
		<Grid container pt={25} pb={10}>
			<Grid ref={scope} item container justifyContent={'center'} gap={3} alignContent={'center'}>
				<Grid item xs={12} sm={4} md={3}>
					<TroubleshootOutlinedIcon
						id={elements.avatar}
						sx={{
							width: '100%',
							height: { xs: '40%', md: '30%' },
							position: 'sticky',
							top: '10%',
							fill: theme.palette.primary.main,
							opacity: 0
						}}
					/>
				</Grid>
				<Grid container item xs={10} sm={4} lg={3} xl={2} justifyContent={'center'} gap={30} alignContent={'center'}>
					<Grid item container gap={2}>
						<Typography sx={{ opacity: 0 }} id={elements.title} variant="h2">
							{ContentConfig.title(theme)}
						</Typography>
						<Typography variant="subtitle1" sx={{ opacity: 0 }} id={elements.subtitle}>
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
						<Grid key={title} item container sx={{ opacity: 0 }} id={elements.listItem} gap={2} wrap={'wrap'}>
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
