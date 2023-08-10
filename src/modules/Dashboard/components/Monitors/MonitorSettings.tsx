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
import { HealthCheck } from 'utils/interfaces';
import { millisecondsToSeconds, secondsToMinutes } from 'date-fns';
import startCase from 'lodash/startCase';
import { CompareType } from 'modules/Dashboard/Pages/Monitors/AddMonitor';

const COMPARE_TYPE_LABELS: { [key in CompareType]: string } = {
	[CompareType.BIG]: '>',
	[CompareType.BIG_EQUAL]: '>=',
	[CompareType.EQUAL]: '=',
	[CompareType.NOT_EQUAL]: '!=',
	[CompareType.SMALL]: '<',
	[CompareType.SMALL_EQUAL]: '<=',
	[CompareType.CONTAINS]: 'Contains',
	[CompareType.DOES_NOT_CONTAIN]: 'Does not contain'
};
// FIXME: Add missing data from API
const MonitorSettings: React.FC<{ monitor: HealthCheck }> = ({ monitor }) => {
	return (
		<Grid container justifyContent={'space-between'} p={2}>
			<Grid container item xs={12} p={3} gap={1}>
				<Typography variant="subtitle1">Request</Typography>

				<Typography component={Grid} gap={1} alignItems={'flex-end'} container item variant="h3">
					<Chip sx={{ p: 1 }} label={'GET'} color={'primary'} />
					<Typography component={Grid} variant="subtitle2" fontWeight={300} item>
						{monitor.url}
					</Typography>
				</Typography>
			</Grid>

			<Grid container item xs={5} p={3} gap={1}>
				<Typography variant="subtitle1">Interval</Typography>

				<Typography component={Grid} variant="subtitle2" fontWeight={300} item xs={12}>
					Every {secondsToMinutes(monitor.interval ?? 0)} minutes
				</Typography>
			</Grid>

			<Grid container item xs={5} p={3} gap={1}>
				<Typography variant="subtitle1">Protocol</Typography>

				<Typography component={Grid} variant="subtitle2" fontWeight={300} item xs={12}>
					{monitor.type}
				</Typography>
			</Grid>
			<Grid container item xs={5} p={3} gap={1}>
				<Typography variant="subtitle1">Request Timeout</Typography>

				<Typography component={Grid} variant="subtitle2" fontWeight={300} item xs={12}>
					{millisecondsToSeconds(monitor.timeout ?? 0)} seconds
				</Typography>
			</Grid>

			<Grid container item xs={12} p={3} gap={1} mb={5}>
				<Typography variant="subtitle1">Locations</Typography>
				{monitor.locations?.map((location) => (
					<Chip icon={<WifiTetheringIcon />} label={startCase(location?.toLowerCase())} key={location} />
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
					<List>
						{monitor.metadata.assertions.map((assertion, index) => (
							<React.Fragment key={`${assertion.compareType}-${index}`}>
								<ListItem>
									<ListItemText
										primary={startCase(assertion.type.toLowerCase())}
										secondary={`${assertion.key ? `${assertion.key} ` : ''}${COMPARE_TYPE_LABELS[assertion.compareType]} ${
											assertion.value
										}`}
									/>
								</ListItem>
								<Divider />
							</React.Fragment>
						))}
					</List>
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
						{monitor.metadata.headers.map((header, index) => (
							<React.Fragment key={header.key + index}>
								<ListItem>
									<ListItemText primary={header.key} secondary={header.value} />
								</ListItem>
								<Divider />
							</React.Fragment>
						))}
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
					<List>
						<ListItem>
							<ListItemText primary="Verify SSL" secondary={monitor.metadata.verifySSL ? 'Yes' : 'No'} />
						</ListItem>
						<Divider />

						<ListItem>
							<ListItemText primary="Follow redirects" secondary={'Yes'} />
						</ListItem>
						<Divider />

						<ListItem>
							<ListItemText primary="Keep cookies when redirecting" secondary={'Yes'} />
						</ListItem>
						<Divider />

						{monitor.metadata.httpUserName && (
							<>
								<ListItem>
									<ListItemText primary="Auth username" secondary={monitor.metadata.httpUserName} />
								</ListItem>
								<Divider />
							</>
						)}

						{monitor.metadata.requestBody && (
							<>
								<ListItem>
									<ListItemText primary="Request Body" secondary={monitor.metadata.requestBody} />
								</ListItem>
								<Divider />
							</>
						)}

						<ListItem>
							<ListItemText primary="Created" secondary={monitor.createdAt.toString()} />
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
