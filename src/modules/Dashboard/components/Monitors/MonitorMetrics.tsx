import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	MenuItem,
	Paper,
	Radio,
	RadioGroup,
	Select,
	ToggleButton,
	ToggleButtonGroup
} from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import React, { useMemo, useTransition } from 'react';
import ResponseTimeChart from '../ResponseTimeChart';
import useGetMonitorLogs, { HealthCheckLogs } from 'modules/Dashboard/queries/useGetMonitorLogs';
import { useParams } from 'react-router-dom';
import { DateFilter } from 'utils/interfaces';
import { startCase } from 'lodash';
import { Region } from 'modules/Dashboard/Pages/Monitors/AddMonitor';
import useGetMonitorGraphData from 'modules/Dashboard/queries/useGetMonitorGraphData';
import { format, isSameDay } from 'date-fns';

enum Options {
	METRICS = 'Metrics',
	LOGS = 'Logs'
}

interface MonitorMetricsProps {
	selectedDates: DateFilter;
}
const MonitorMetrics: React.FC<MonitorMetricsProps> = ({ selectedDates }) => {
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

			{alignment === Options.METRICS ? (
				<Metrics selectedDates={selectedDates} />
			) : alignment === Options.LOGS ? (
				<Logs selectedDates={selectedDates} />
			) : null}
		</Grid>
	);
};
export default MonitorMetrics;

export enum MetricTypes {
	RESPONSE_TIME = 'RESPONSE_TIME',
	UPTIME = 'UPTIME'
}
type RegionSelection = 'all' | Region;
const Metrics: React.FC<MonitorMetricsProps> = ({ selectedDates }) => {
	const { monitorId } = useParams<{ monitorId: string }>();
	const [metricType, setMetricType] = React.useState(MetricTypes.RESPONSE_TIME);
	const [selectedRegion, setSelectedRegion] = React.useState<RegionSelection>('all');
	const disabledRegionSelector = useMemo(
		() => metricType !== MetricTypes.RESPONSE_TIME || isSameDay(selectedDates.start, selectedDates.end),
		[metricType, selectedDates.end, selectedDates.start]
	);
	const { data: metrics } = useGetMonitorGraphData(
		selectedDates,
		selectedRegion === 'all' ? undefined : selectedRegion,
		monitorId,
		metricType === MetricTypes.UPTIME ? 'uptime' : undefined
	);
	const handleRegionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedRegion((event.target as HTMLInputElement).value as RegionSelection);
	};

	return (
		<>
			<Grid item xs={12} sm={4} lg={3}>
				<Select fullWidth value={metricType} onChange={(e) => setMetricType(e.target.value as MetricTypes)}>
					<MenuItem value={MetricTypes.RESPONSE_TIME}>Response Time</MenuItem>
					<MenuItem value={MetricTypes.UPTIME}>Uptime</MenuItem>
				</Select>
			</Grid>
			<Grid container item gap={5} sx={{ width: '100%' }}>
				<Grid item xs={12} sx={{ minHeight: { xs: '25vh', lg: '35vh' }, maxHeight: { xs: '50vh', lg: '35vh' }, width: '100%' }}>
					<ResponseTimeChart
						metrics={metrics?.data}
						metricType={metricType}
						options={{
							isSameDay: isSameDay(selectedDates.start, selectedDates.end),
							withLocation: selectedRegion !== 'all'
						}}
						ReactChartsComponentProps={{ style: { minHeight: { xs: '25vh', lg: '35vh' } }, theme: 'dark' }}
					/>
				</Grid>

				<Grid item>
					<FormControl>
						<FormLabel id="demo-radio-buttons-group-label">Regions</FormLabel>
						<RadioGroup
							row
							aria-labelledby="regions-selector"
							defaultValue="all"
							value={selectedRegion}
							onChange={handleRegionChange}
							name="regions-selector"
						>
							<FormControlLabel disabled={disabledRegionSelector} value="all" control={<Radio />} label="All" />
							{Object.keys(Region).map((region) => (
								<FormControlLabel
									disabled={disabledRegionSelector}
									key={region}
									value={region}
									control={<Radio />}
									label={startCase(region.toLowerCase())}
								/>
							))}
						</RadioGroup>
					</FormControl>
				</Grid>
			</Grid>
		</>
	);
};

const eventsColumns: GridColDef[] = [
	{
		field: 'eventTime',
		headerName: 'Event Time',
		minWidth: 250,
		valueFormatter: (param) => format(new Date(param.value), 'yyyy/MM/dd - hh:mm:ss aa') + ' UTC'
	},

	{ field: 'responsecode', headerName: 'Response', minWidth: 200 },
	{ field: 'responsetime', headerName: 'Time', minWidth: 200, valueFormatter: (params) => `${params.value} ms` },
	{
		field: 'location',
		headerName: 'Location',
		minWidth: 150,
		valueFormatter: (params) => startCase(params.value?.toLowerCase() || '')
	},
	{
		field: 'status',
		headerName: 'Status',
		minWidth: 150,
		cellClassName: (params) => (params.value === 1 ? 'status-success' : 'status-error'),
		valueFormatter: (params) => (params.value === 1 ? 'Healthy' : 'Failed')
	}
];

const issuesColumns: GridColDef[] = [
	{ field: 'eventTime', headerName: 'Event Time', minWidth: 250 },
	// { field: 'name', headerName: 'Name', minWidth: 250 },
	{
		field: 'location',
		headerName: 'Location',
		minWidth: 150,
		valueFormatter: (params) => startCase(params.value?.toLowerCase() || '')
	},
	{
		field: 'empty space',
		headerName: '',
		flex: 1,
		disableColumnMenu: true,
		sortable: false,
		filterable: false,
		hideable: false
	},
	{
		field: 'description',
		headerName: 'Description',
		minWidth: 250
		// renderCell: (params) => (
		// 	<ul>
		// 		{params.value?.map((assertion: AssertionResult) => (
		// 			<li>{assertion.message}</li>
		// 		))}
		// 	</ul>
		// )
	}
];

const getTableData = (logs?: HealthCheckLogs[]): GridRowsProp => {
	return (
		logs?.map((log) => ({
			id: `${log.timestamp}-${log.region}`,
			eventTime: log.timestamp,
			responsecode: log.responsecode,
			responsetime: log.responsetime,
			location: log.region,
			status: log.status,
			// name: log.errreason,

			description: log.errreason
		})) ?? []
	);
};
enum LogTypes {
	EVENTS = 'Events',
	INCIDENTS = 'Incidents'
}

const ITEMS_PER_PAGE = 100;
const Logs: React.FC<MonitorMetricsProps> = ({ selectedDates }) => {
	const [logType, setLogType] = React.useState(LogTypes.EVENTS);
	const { monitorId } = useParams<{ monitorId: string }>();

	const [paginationModel, setPaginationModel] = React.useState({
		page: 0,
		pageSize: ITEMS_PER_PAGE
	});

	const { data: logs, isLoading } = useGetMonitorLogs(
		selectedDates,
		paginationModel.page * paginationModel.pageSize,
		paginationModel.pageSize,
		monitorId,
		logType === LogTypes.INCIDENTS
	);
	const fullCount = useMemo(() => (logs?.data[0] ? Number(logs.data[0].fullcount) : 0), [logs?.data]);
	const [isTransitioning, startTransition] = useTransition();

	const [rows, columns] = useMemo(
		() => (logType === LogTypes.EVENTS ? [getTableData(logs?.data), eventsColumns] : [getTableData(logs?.data), issuesColumns]),
		[logType, logs]
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
					<DataGrid
						rowHeight={80}
						paginationModel={paginationModel}
						paginationMode="server"
						onPaginationModelChange={setPaginationModel}
						rowCount={fullCount}
						pageSizeOptions={[ITEMS_PER_PAGE]}
						sx={{
							'& .status-success': {
								bgcolor: 'success.dark'
							},
							'& .status-error': {
								bgcolor: 'error.dark'
							}
						}}
						loading={isTransitioning || isLoading}
						rows={rows}
						columns={columns}
						hideFooterSelectedRowCount
					/>
				</Grid>
			</Grid>
		</>
	);
};
