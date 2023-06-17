import React from 'react';
import { Divider, Grid, Link, ListItemText, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CopyrightIcon from '@mui/icons-material/Copyright';
import { RoutesConfig } from 'config/Routes/routeConfig';
const Config: { text: string; url: RoutesConfig }[] = [
	{
		text: 'Terms',
		url: RoutesConfig.dummy
	},
	{
		text: 'Privacy',
		url: RoutesConfig.dummy
	},
	{
		text: 'Pricing',
		url: RoutesConfig.dummy
	},
	{
		text: 'FAQ',
		url: RoutesConfig.dummy
	},
	{
		text: 'API',
		url: RoutesConfig.dummy
	},
	{
		text: 'Status',
		url: RoutesConfig.dummy
	}
];

const Footer: React.FC = () => {
	return (
		<Grid gap={3} container>
			<Grid item xs={12}>
				<Divider />
			</Grid>

			<Grid container item xs={12} justifyContent={'center'} p={2} gap={2}>
				<Grid container item sm={5} lg={3}>
					<Typography display={'flex'} alignItems={'center'} gap={1}>
						<CopyrightIcon /> 2023 RemoteOps, Inc
					</Typography>
				</Grid>
				<Grid item container gap={2} sm={5} lg={4}>
					{Config.map(({ text, url }) => (
						<Grid key={text} item>
							<ListItemText>
								<Link to={url} component={RouterLink} noWrap>
									{text}
								</Link>
							</ListItemText>
						</Grid>
					))}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Footer;
