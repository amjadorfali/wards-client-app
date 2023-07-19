import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import { Accordion, AccordionSummary, Button, Grid, Typography } from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import Ping from 'modules/Dashboard/components/Ping';
import { ExpandMore } from '@mui/icons-material';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import SendIcon from '@mui/icons-material/Send';
import SettingsIcon from '@mui/icons-material/Settings';
import OverviewAccordion from 'modules/Dashboard/components/Monitors/OverviewAcordion';
import MonitorSettings from 'modules/Dashboard/components/Monitors/MonitorSettings';
import MonitorMetrics from 'modules/Dashboard/components/Monitors/MonitorMetrics';
import DateFilter from 'modules/Dashboard/components/Monitors/DateFilter';
import { addDays, subDays } from 'date-fns';

const MonitorDetails: React.FC = () => {
	const { monitorId } = useParams<{ monitorId: string }>();
	const [selectedDates, setSelectedDates] = React.useState<{ start: Date; end: Date }>({
		start: subDays(new Date(), 1),
		end: addDays(new Date(), 1)
	});
	// TODO: Continue on logic for monitors details

	// TransitionProps={{ unmountOnExit: true }}  might be useful on accordions if we face perf issues
	return (
		<Grid container minHeight={'40svh'} gap={3}>
			<Grid item xs={12}>
				<Button component={RouterLink} to={`../`} startIcon={<ArrowBackIcon />}>
					Monitors
				</Button>
			</Grid>
			<Grid item xs={12} container height={'fit-content'} gap={1}>
				<Grid item alignSelf={'center'}>
					<Ping isSuccess={Number(monitorId) % 2} isInfinite={1} />
				</Grid>

				<Grid item>
					<Typography variant="h1">.com</Typography>
					<Typography mt={1} variant="caption">
						<Typography variant="caption" color={Number(monitorId) % 2 ? 'success.main' : 'error.main'}>
							{Number(monitorId) % 2 ? 'Up' : 'Down'}
						</Typography>{' '}
						. Checked every 3 minutes
					</Typography>
				</Grid>
			</Grid>

			<Grid container item xs={12} sx={{ gap: { xs: 4, md: 0 } }} justifyContent={'space-between'} alignItems={'flex-end'}>
				<Grid container item xs={12} md={8} gap={2} height={'fit-content'}>
					<Button variant="outlined" component={RouterLink} to="" startIcon={<SendIcon />}>
						Send Test alert
					</Button>

					<Button variant="outlined" component={RouterLink} to="" startIcon={<PauseCircleIcon />}>
						Pause Monitor
					</Button>
					<Button variant="outlined" component={RouterLink} to="" startIcon={<SettingsIcon />}>
						Configure
					</Button>
				</Grid>
				<Grid item>
					<DateFilter title="Choose dates" selectedDates={selectedDates} onDateSelect={(date) => setSelectedDates(date)} />
				</Grid>
			</Grid>

			<Accordion sx={{ flexBasis: '100%' }} defaultExpanded>
				<AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel-1-content" id={'panel-1-header'} sx={{ p: 2 }}>
					<Typography variant="h2">Overview</Typography>
				</AccordionSummary>
				<OverviewAccordion />
			</Accordion>
			<Accordion sx={{ flexBasis: '100%', width: '100%' }}>
				<AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel-3-content" id={'panel-1-header'} sx={{ p: 2 }}>
					<Typography variant="h2">Metrics & Logs</Typography>
				</AccordionSummary>
				<MonitorMetrics />
			</Accordion>
			<Accordion sx={{ flexBasis: '100%' }}>
				<AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel-2-content" id={'panel-1-header'} sx={{ p: 2 }}>
					<Typography variant="h2">Monitor Details</Typography>
				</AccordionSummary>
				<MonitorSettings />
			</Accordion>
		</Grid>
	);
};
export default MonitorDetails;
