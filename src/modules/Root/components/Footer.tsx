import React from 'react';
import { Divider, Grid, Link, ListItemText, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CopyrightIcon from '@mui/icons-material/Copyright';
import { RoutesConfig } from 'config/Routes/routeConfig';
const Config: { text: string; url: RoutesConfig }[] = [
	{
		text: 'Terms of Use',
		url: RoutesConfig.terms
	},
	{
		text: 'Privacy Policy',
		url: RoutesConfig.privacy
	}
];

const Footer: React.FC = () => {
	return (
		<Grid gap={3} container>
			<Grid item xs={12}>
				<Divider />
			</Grid>

			<Grid container item xs={12} justifyContent={'center'} p={2} gap={2}>
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
				<Grid container item sm={5} lg={3}>
					<Typography display={'flex'} alignItems={'center'} gap={1}>
						<CopyrightIcon /> All rights reserved - Wards, 2023
					</Typography>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Footer;
