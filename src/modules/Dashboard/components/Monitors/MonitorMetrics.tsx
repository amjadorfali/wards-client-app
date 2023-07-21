import { Grid, MenuItem, Paper, Select, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import React, { useMemo, useTransition } from 'react';
import ResponseTimeChart from '../ResponseTimeChart';

enum Options {
	METRICS = 'Metrics',
	LOGS = 'Logs'
}
const MonitorMetrics: React.FC = () => {
	const [alignment, setAlignment] = React.useState<Options>(Options.METRICS);

	const handleChange = (_event: React.MouseEvent<HTMLElement>, newAlignment: Options) => {
		if (!newAlignment) return;
		setAlignment(newAlignment);
	};

	return (
		<Grid component={Paper} container justifyContent={'space-between'} p={2} elevation={4} gap={3}>
			<Grid container item xs={5}>
				<ToggleButtonGroup color="primary" value={alignment} exclusive onChange={handleChange} aria-label="Platform">
					<ToggleButton value={Options.METRICS}>{Options.METRICS}</ToggleButton>
					<ToggleButton value={Options.LOGS}>{Options.LOGS}</ToggleButton>
				</ToggleButtonGroup>
			</Grid>

			{alignment === Options.METRICS ? <Metrics /> : alignment === Options.LOGS ? <Logs /> : null}
		</Grid>
	);
};
export default MonitorMetrics;

export enum MetricTypes {
	RESPONSE_TIME = 'RESPONSE_TIME',
	UPTIME = 'UPTIME'
}

const Metrics: React.FC = () => {
	const [metricType, setMetricType] = React.useState(MetricTypes.RESPONSE_TIME);

	return (
		<>
			<Grid item xs={12} sm={4} lg={3}>
				<Select fullWidth value={metricType} onChange={(e) => setMetricType(e.target.value as MetricTypes)}>
					<MenuItem value={MetricTypes.RESPONSE_TIME}>Response Time</MenuItem>
					<MenuItem value={MetricTypes.UPTIME}>Uptime</MenuItem>
				</Select>
			</Grid>
			<Grid container item gap={5} justifyContent={'flex-end'} sx={{ width: '100%' }}>
				<Grid item xs={12} sx={{ minHeight: { xs: '25vh', lg: '35vh' }, maxHeight: { xs: '50vh', lg: '35vh' }, width: '100%' }}>
					<ResponseTimeChart
						metricType={metricType}
						ReactChartsComponentProps={{ style: { minHeight: { xs: '25vh', lg: '35vh' } }, theme: 'dark' }}
					/>
				</Grid>
			</Grid>
		</>
	);
};

const eventsRows: GridRowsProp = [
	{ id: 1, eventTime: new Date(), response: '200 OK', time: '150ms', location: 'US', status: 'Healthy' },
	{ id: 2, eventTime: new Date(), response: '200 OK', time: '100ms', location: 'EU', status: 'Healthy' },
	{ id: 3, eventTime: new Date(), response: '200 OK', time: '135ms', location: 'AU', status: 'Healthy' },
	{ id: 4, eventTime: new Date(), response: '200 OK', time: '105ms', location: 'ASIA', status: 'Healthy' },
	{ id: 5, eventTime: new Date(), response: '200 OK', time: '1020ms', location: 'US', status: 'Healthy' }
];

const eventsColumns: GridColDef[] = [
	{ field: 'eventTime', headerName: 'Event Time', minWidth: 250 },
	{ field: 'response', headerName: 'Response', minWidth: 200 },
	{ field: 'time', headerName: 'Time', minWidth: 200 },
	{ field: 'location', headerName: 'Location', minWidth: 150 },
	{ field: 'status', headerName: 'Status', minWidth: 150 }
];

const issuesRows: GridRowsProp = [
	{ id: 1, eventTime: new Date(), name: '200 OK', description: 'US' },
	{ id: 2, eventTime: new Date(), name: '200 OK', description: 'EU' },
	{ id: 3, eventTime: new Date(), name: '200 OK', description: 'AU' },
	{ id: 4, eventTime: new Date(), name: '200 OK', description: 'ASIA' },
	{ id: 5, eventTime: new Date(), name: '200 OK', description: 'US' }
];

const issuesColumns: GridColDef[] = [
	{ field: 'eventTime', headerName: 'Event Time', minWidth: 250 },
	{ field: 'name', headerName: 'Name', minWidth: 200 },
	{ field: 'description', headerName: 'Description', minWidth: 150 }
];

enum LogTypes {
	EVENTS = 'Events',
	INCIDENTS = 'Incidents'
}
const Logs: React.FC = () => {
	const [logType, setLogType] = React.useState(LogTypes.EVENTS);
	const [isTransitioning, startTransition] = useTransition();

	const [rows, columns] = useMemo(
		() => (logType === LogTypes.EVENTS ? [eventsRows, eventsColumns] : [issuesRows, issuesColumns]),
		[logType]
	);
	return (
		<>
			<Grid item xs={12} sm={4} lg={3}>
				<Select fullWidth value={logType} onChange={(e) => startTransition(() => setLogType(e.target.value as LogTypes))}>
					<MenuItem value={LogTypes.EVENTS}>Events</MenuItem>
					<MenuItem value={LogTypes.INCIDENTS}>Incidents</MenuItem>
				</Select>
			</Grid>
			<Grid container item gap={5} justifyContent={'flex-end'} sx={{ width: '100%' }}>
				<Grid item xs={12} sx={{ minHeight: { xs: '25vh', lg: '35vh' }, maxHeight: { xs: '50vh', lg: '35vh' }, width: '100%' }}>
					<DataGrid loading={isTransitioning} rows={rows} columns={columns} />
				</Grid>
			</Grid>
		</>
	);
};
