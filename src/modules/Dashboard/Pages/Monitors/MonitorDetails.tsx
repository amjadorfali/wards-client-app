import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import {
	Accordion,
	AccordionSummary,
	Button,
	CircularProgress,
	Divider,
	Grid,
	IconButton,
	Tooltip,
	Typography,
	useTheme
} from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import Ping from 'modules/Dashboard/components/Ping';
import { ExpandMore, Info, PlayCircle as PlayCircleIcon } from '@mui/icons-material';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import SendIcon from '@mui/icons-material/Send';
import SettingsIcon from '@mui/icons-material/Settings';
import OverviewAccordion from 'modules/Dashboard/components/Monitors/OverviewAcordion';
import MonitorSettings from 'modules/Dashboard/components/Monitors/MonitorSettings';
import MonitorMetrics from 'modules/Dashboard/components/Monitors/MonitorMetrics';
import DateFilter from 'modules/Dashboard/components/Monitors/DateFilter';
import { secondsToMinutes } from 'date-fns';
import { RoutesConfig } from 'config/Routes/routeConfig';
import useGetMonitorDetails from 'modules/Dashboard/queries/useGetMonitorDetails';
import useGetMonitorOverview from 'modules/Dashboard/queries/useGetMonitorOverview';
import useTogglePauseMonitor from 'modules/Dashboard/mutations/useTogglePauseMonitor';
import { toast } from 'react-toastify';

const MonitorDetails: React.FC = () => {
	const theme = useTheme();
	const { monitorId } = useParams<{ monitorId: string }>();
	const [selectedDates, setSelectedDates] = React.useState<{ start: Date; end: Date }>({
		// start: subDays(new Date(), 1),
		start: new Date(),
		end: new Date()
	});

	const { data: monitorDetails, isSuccess: monitorDetailedFetched, refetch: refetchMonitorDetails } = useGetMonitorDetails();
	const { data: monitorOverview, isSuccess: monitorOverviewFetched, refetch: refetchMonitorOverview } = useGetMonitorOverview();
	const { mutate: togglePauseMonitor } = useTogglePauseMonitor();
	/**
	 * API calls for buttons
	 *
	 */

	const handlePauseMonitor = () => {
		if (monitorId)
			togglePauseMonitor(monitorId, {
				onSuccess: () => toast.success('Monitor paused'),
				onError: () => toast.error('Something went wrong, please try again later'),
				onSettled: () => {
					refetchMonitorOverview();
					refetchMonitorDetails();
				}
			});
		else toast.error('Something went wrong, please try again later');
	};
	return (
		<Grid container minHeight={'40svh'} gap={3}>
			<Grid item xs={12}>
				<Button component={RouterLink} to={`../`} startIcon={<ArrowBackIcon />}>
					Monitors
				</Button>
			</Grid>
			{monitorOverviewFetched && monitorDetailedFetched ? (
				<Grid item xs={12} container height={'fit-content'} gap={1}>
					<Grid item alignSelf={'center'}>
						<Ping
							customcolor={
								typeof monitorOverview?.data.status?.code === 'number' && monitorDetails?.data.enabled
									? monitorOverview?.data.status?.code === 1
										? theme.palette.success.main
										: theme.palette.error.main
									: theme.palette.warning.main
							}
							isInfinite={1}
						/>
					</Grid>

					<Grid item>
						<Typography variant="h1">{monitorDetails?.data.name}</Typography>
						<Typography mt={1} variant="caption">
							<Typography
								variant="caption"
								color={
									typeof monitorOverview?.data.status?.code === 'number' && monitorDetails?.data.enabled
										? monitorOverview?.data.status?.code === 1
											? 'success.main'
											: 'error.main'
										: 'warning.main'
								}
							>
								{monitorDetails?.data.enabled
									? typeof monitorOverview?.data.status?.code === 'number'
										? monitorOverview?.data.status?.code === 1
											? 'Up'
											: 'Down'
										: 'Pending'
									: 'Paused'}
							</Typography>{' '}
							. Checked every {secondsToMinutes(monitorDetails?.data.interval ?? 0)} minutes
						</Typography>
					</Grid>
				</Grid>
			) : (
				<CircularProgress color="inherit" />
			)}

			<Grid container item xs={12} sx={{ gap: { xs: 4, md: 0 } }} justifyContent={'space-between'} alignItems={'flex-end'}>
				<Grid container item xs={12} md={8} gap={2} height={'fit-content'}>
					{/* // TODO: Continue on logic for monitors details */}
					<Button variant="outlined" component={RouterLink} to="" startIcon={<SendIcon />}>
						Send Test alert
					</Button>

					<Button
						variant="outlined"
						onClick={handlePauseMonitor}
						startIcon={monitorDetails?.data.enabled ? <PauseCircleIcon /> : <PlayCircleIcon />}
					>
						{monitorDetails?.data.enabled ? 'Pause' : 'Enable'} Monitor
					</Button>
					<Button variant="outlined" component={RouterLink} to={RoutesConfig.editMonitor} startIcon={<SettingsIcon />}>
						Configure
					</Button>
				</Grid>
				<Grid item>
					<Tooltip
						title={
							<Typography paragraph color="inherit">
								Filter by 1 Day only to see the full data instead of aggregations for Response Time Graph
							</Typography>
						}
					>
						<IconButton>
							<Info color="primary" />
						</IconButton>
					</Tooltip>
				</Grid>
				<Grid item>
					<DateFilter title="Choose dates" selectedDates={selectedDates} onDateSelect={(date) => setSelectedDates(date)} />
				</Grid>
			</Grid>

			<OverviewAccordion
				fetchedData={monitorOverviewFetched}
				monitorDetails={monitorDetails?.data}
				monitorOverview={monitorOverview?.data}
			/>
			<MonitorMetrics selectedDates={selectedDates} />

			<Accordion sx={{ flexBasis: '100%' }} defaultExpanded>
				<AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel-2-content" id={'panel-1-header'} sx={{ p: 2 }}>
					<Typography variant="h2">Monitor Details</Typography>
				</AccordionSummary>
				<Divider />

				{!!monitorDetails?.data && <MonitorSettings monitor={monitorDetails?.data} />}
			</Accordion>
		</Grid>
	);
};
export default MonitorDetails;
