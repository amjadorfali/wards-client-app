import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Chip,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemText,
	Typography
} from '@mui/material';
import React from 'react';
import WifiTetheringIcon from '@mui/icons-material/WifiTethering';
import { ExpandMore } from '@mui/icons-material';

const Locations = ['America', 'Europe', 'Asia', 'Australia'];
const MonitorSettings: React.FC = () => {
	return (
		<Grid container justifyContent={'space-between'} p={2}>
			<Grid container item xs={12} p={3} gap={1}>
				<Typography variant="subtitle1">Request</Typography>

				<Typography component={Grid} gap={1} alignItems={'flex-end'} container item variant="h3">
					<Chip sx={{ p: 1 }} label={'GET'} color={'primary'} />
					<Typography component={Grid} variant="subtitle2" fontWeight={300} item>
						https://amjadorfali.com
					</Typography>
				</Typography>
			</Grid>

			<Grid container item xs={5} p={3} gap={1}>
				<Typography variant="subtitle1">Interval</Typography>

				<Typography component={Grid} variant="subtitle2" fontWeight={300} item xs={12}>
					Every 5 minutes
				</Typography>
			</Grid>

			<Grid container item xs={5} p={3} gap={1}>
				<Typography variant="subtitle1">Protocol</Typography>

				<Typography component={Grid} variant="subtitle2" fontWeight={300} item xs={12}>
					HTTP
				</Typography>
			</Grid>
			<Grid container item xs={5} p={3} gap={1}>
				<Typography variant="subtitle1">Request Timeout</Typography>

				<Typography component={Grid} variant="subtitle2" fontWeight={300} item xs={12}>
					10 seconds
				</Typography>
			</Grid>

			<Grid container item xs={12} p={3} gap={1} mb={5}>
				<Typography variant="subtitle1">Locations</Typography>
				{Locations.map((location) => (
					<Chip icon={<WifiTetheringIcon />} label={location} key={location} />
				))}
			</Grid>
			<Divider sx={{ width: '100%', my: 3 }} />

			<Accordion elevation={10} disableGutters sx={{ alignSelf: 'flex-start', flexBasis: { xs: '100%', md: '45%', lg: '30%' } }}>
				<AccordionSummary
					expandIcon={<ExpandMore />}
					aria-controls="panel-assertions-content"
					id={'panel-assertions-header'}
					sx={{ p: 2 }}
				>
					<Typography variant="h3">Assertions</Typography>
				</AccordionSummary>
				<Divider />
				<AccordionDetails
					sx={{
						maxHeight: '20rem',
						minHeight: '20rem',

						overflow: 'scroll'
					}}
				>
					{/* <Grid item xs={12} md={6}> */}
					<List>
						<ListItem>
							<ListItemText primary="ssl_certificate.expires_in" secondary={'> 15 days'} />
						</ListItem>
						<Divider />

						<ListItem>
							<ListItemText primary="response.code" secondary={'= 200'} />
						</ListItem>
						<Divider />

						<ListItem>
							<ListItemText primary="response.time" secondary={'< 500ms'} />
						</ListItem>
						<Divider />
					</List>
					{/* </Grid> */}
				</AccordionDetails>
			</Accordion>

			<Accordion elevation={10} disableGutters sx={{ alignSelf: 'flex-start', flexBasis: { xs: '100%', md: '45%', lg: '30%' } }}>
				<AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel-headers-content" id={'panel-headers-header'} sx={{ p: 2 }}>
					<Typography variant="h3">Headers</Typography>
				</AccordionSummary>
				<Divider />

				<AccordionDetails
					sx={{
						maxHeight: '20rem',
						minHeight: '20rem',
						overflow: 'scroll'
					}}
				>
					<List>
						<ListItem>
							<ListItemText primary="Authorization" secondary={'Bearer 4jn243tbui5h98dfijgn49u5-45-tg4-rg56y-ged-f-ry-j5-tgerg45'} />
						</ListItem>
						<Divider />

						<ListItem>
							<ListItemText primary="name" secondary={'hi'} />
						</ListItem>
						<Divider />
					</List>
				</AccordionDetails>
			</Accordion>
			<Accordion elevation={10} disableGutters sx={{ alignSelf: 'flex-start', flexBasis: { xs: '100%', md: '45%', lg: '30%' } }}>
				<AccordionSummary
					expandIcon={<ExpandMore />}
					aria-controls="panel-more-info-content"
					id={'panel-more-info-header'}
					sx={{ p: 2 }}
				>
					<Typography variant="h3">More Settings</Typography>
				</AccordionSummary>
				<Divider />

				<AccordionDetails
					sx={{
						maxHeight: '20rem',
						minHeight: '20rem',
						overflow: 'scroll'
					}}
				>
					{/* <Grid item xs={12} md={6}> */}
					<List>
						<ListItem>
							<ListItemText primary="Verify SSL" secondary={'Yes'} />
						</ListItem>
						<Divider />

						<ListItem>
							<ListItemText primary="Follow redirects" secondary={'No'} />
						</ListItem>
						<Divider />

						<ListItem>
							<ListItemText primary="Keep cookies when redirecting" secondary={'Yes'} />
						</ListItem>
						<Divider />

						<ListItem>
							<ListItemText primary="Auth username" secondary={'Username'} />
						</ListItem>
						<Divider />

						<ListItem>
							<ListItemText primary="Request Body" secondary={'"{ samir : "hello" }"'} />
						</ListItem>
						<Divider />

						<ListItem>
							<ListItemText primary="Created" secondary={'7/8/2023, 3:55:47 PM'} />
						</ListItem>
						<Divider />
					</List>
					{/* </Grid> */}
				</AccordionDetails>
			</Accordion>

			<Accordion elevation={10} disableGutters sx={{ alignSelf: 'flex-start', flexBasis: { xs: '100%', md: '45%', lg: '30%' } }}>
				<AccordionSummary
					expandIcon={<ExpandMore />}
					aria-controls="panel-more-info-content"
					id={'panel-more-info-header'}
					sx={{ p: 2 }}
				>
					<Typography variant="h3">Site Info</Typography>
				</AccordionSummary>
				<Divider />

				<AccordionDetails
					sx={{
						maxHeight: '20rem',
						minHeight: '20rem',
						overflow: 'scroll'
					}}
				>
					{/* <Grid item xs={12} md={6}> */}
					<List>
						<ListItem>
							<ListItemText
								primary="SSL Certificate"
								secondary={
									<>
										Issued By: R3
										<br />
										Expires On: 9/20/2023, 9:13:19 PM UTC
									</>
								}
							/>
						</ListItem>
						<Divider />

						<ListItem>
							<ListItemText
								primary="Domain (amjadorfali.com)"
								secondary={
									<>
										Registrar: GoDaddy.com, LLC
										<br />
										Expires On: 6/5/2027, 10:56:03 AM UTC
										<br />
										Nameservers: DNS1.P01.NSONE.NET DNS2.P01.NSONE.NET DNS3.P01.NSONE.NET DNS4.P01.NSONE.NET
									</>
								}
							/>
						</ListItem>
						<Divider />
					</List>
					{/* </Grid> */}
				</AccordionDetails>
			</Accordion>
		</Grid>
	);
};

export default MonitorSettings;
