import { Avatar, Button, Grid, Theme, Typography, useTheme } from '@mui/material';
import React, { useEffect } from 'react';

import TroubleshootOutlinedIcon from '@mui/icons-material/TroubleshootOutlined';
import { useAnimate, useInView } from 'framer-motion';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { Link as RouterLink } from 'react-router-dom';
import { RoutesConfig } from 'config/Routes/routeConfig';

const content = {
	title: (theme: Theme) => (
		<>
			Empower Your
			<Typography variant="body1" sx={{ ...theme.typography.h2 }} display={'inline'} color="primary.main">
				{' '}
				Monitoring
			</Typography>
		</>
	),
	subtitle: ['Unlock a comprehensive set of features', ' tailored to enhance your monitoring experience.'],
	button: { text: 'Get Started', link: RoutesConfig.signUp },
	list: [
		{
			title: 'Health-checks',
			subtitle:
				'Schedule automated cron-based health-checks to ensure timely pings, promptly detecting and alerting you to any disruptions.',
			Icon: HealthAndSafetyIcon
		},
		{
			title: 'Log Tracking',
			subtitle:
				'Capture detailed logs of all API calls, providing valuable insights into the health and performance of your applications.',
			Icon: FindInPageIcon
		},

		{
			title: 'API monitoring',
			subtitle: 'Monitor the response and request times of your APIs, enabling you to identify and address performance bottlenecks.',
			Icon: QueryStatsIcon
		},
		{
			title: 'Real-time Alarms',
			subtitle:
				'Receive instant notifications and alarms when health-checks fail, empowering you to take immediate action and prevent potential downtime.',
			Icon: AccessAlarmIcon
		}
	]
};

const elements = {
	title: 'title',
	subtitle: 'subtitle',
	listItem: 'listItem',
	avatar: 'avatar'
};
const animationSequence = Object.keys(elements)
	.filter((id) => id !== elements.avatar)
	.map((id) => [`#${id}`, { opacity: 1 }, { duration: 0.7, at: '<' }]);

const FeaturesSection: React.FC = () => {
	const theme = useTheme();

	const [scope, animate] = useAnimate<HTMLDivElement>();
	const inView = useInView(scope, { once: true, margin: '0px 0px -22% 0px' });

	useEffect(() => {
		if (inView) {
			animate([...animationSequence], {});
			animate(`#${elements.avatar}`, { y: [40, 0], opacity: 1 }, { duration: 0.7 });
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
							{content.title(theme)}
						</Typography>
						<Typography sx={{ opacity: 0 }} id={elements.subtitle}>
							{content.subtitle.map((text) => (
								<React.Fragment key={text}>
									{text}
									<br />
								</React.Fragment>
							))}
						</Typography>
						<Button
							component={RouterLink}
							to={content.button.link}
							variant="contained"
							size="large"
							color="primary"
							sx={{ textTransform: 'capitalize' }}
						>
							{content.button.text}
						</Button>
					</Grid>

					{content.list.map(({ title, subtitle, Icon }) => (
						<Grid key={title} item container sx={{ opacity: 0 }} id={elements.listItem} gap={2} wrap={'wrap'}>
							<Grid item xs={12}>
								<Avatar sx={{ bgcolor: theme.palette.primary.main, width: '3rem', height: '3rem' }}>
									<Icon sx={{ width: '2rem', height: '2rem' }} />
								</Avatar>
							</Grid>

							<Typography variant="h4">{title}</Typography>

							<Typography>{subtitle}</Typography>
						</Grid>
					))}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default FeaturesSection;
