import React from 'react';
import { Divider, Grid, Link, ListItemText, Typography, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Config = [
	{
		title: 'Solutions',
		links: ['Cron', 'Health checks', 'Alarms']
	},
	{
		title: 'Support',
		links: ['Pricing', 'Docs', 'SDKs']
	},
	{
		title: 'Company',
		links: ['About us', 'Contact us']
	},
	{
		title: 'Legal',
		links: ['Terms of service', 'Privacy Policy']
	}
];

const Footer: React.FC = () => {
	const theme = useTheme();
	return (
		<Grid
			sx={{
				background: theme.palette.customBg.gradient,
				//Responsive layout
				pt: { xs: 15, md: 10 },
				alignContent: { md: 'center' }
			}}
			gap={3}
			container
		>
			<Grid
				item
				xs={12}
				alignItems={'stretch'}
				container
				sx={{ p: 3, gap: { xs: 2, sm: 0 }, justifyContent: { xs: 'start', sm: 'center' } }}
			>
				{Config.map(({ links, title }) => (
					<Grid container key={title} item xs={6} sm={3} md={2} justifyContent={'center'} gap={0.1}>
						<Grid item xs={6}>
							<Typography variant="h6" color={'text.secondary'}>
								{title}
							</Typography>
						</Grid>
						<Grid item xs={6} height={'100%'}>
							{links.map((link) => (
								<ListItemText key={link}>
									<Link href="/"></Link>

									<Link to="/" component={RouterLink} noWrap>
										{link}
									</Link>
								</ListItemText>
							))}
						</Grid>
					</Grid>
				))}
			</Grid>

			<Grid item xs={12}>
				<Divider sx={{ background: theme.palette.textTertiary }} />
			</Grid>

			<Grid container item xs={12} justifyContent={'space-between'} alignContent={'center'} gap={2} p={1}>
				<Grid item xs={12} md={3} container sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
					<Typography variant="subtitle2">All rights reserved</Typography>
				</Grid>
				<Grid item xs={12} md={3} container sx={{ justifyContent: { xs: 'center', md: 'right' } }}>
					<Typography variant="subtitle2">All rights reserved</Typography>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Footer;
