import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import axiosInstance from 'services/api';
import { formatDateFilters } from 'utils/formatDateFilters';
import { DateFilter } from 'utils/interfaces';
import { Region } from '../Pages/Monitors/AddMonitor';

export type Percentile = { timestamp: string; responseTime: number };
export interface ResponseTimePercentiles {
	p10: Percentile[];
	p50: Percentile[];
	p90: Percentile[];
	p95: Percentile[];
	p99: Percentile[];
}

export type OneDayData = {
	region: string;
	data: {
		responseTime: number;
		status: number;
		timestamp: string;
	}[];
}[];

export type UptimeData = {
	region: string;
	data: {
		average_status_percentage: number;
		timestamp: string;
	}[];
}[];

export type GraphData = ResponseTimePercentiles | OneDayData | UptimeData;

interface HealthCheckGraphQuery {
	data: GraphData;
}

const useGetMonitorGraphData = (selectedDates: DateFilter, location?: Region, monitorId?: string, type?: 'uptime') => {
	const { endDate, startDate } = useMemo(() => formatDateFilters(selectedDates), [selectedDates]);

	return useQuery({
		queryFn: () =>
			axiosInstance
				.get<HealthCheckGraphQuery>('/api/health/graph', {
					params: {
						startDate,
						endDate,
						location,
						taskId: monitorId,
						type
					},
					baseURL: import.meta.env.VITE_INTERNAL_METRIC_API_HOST
				})
				.then((res) => res.data),
		queryKey: ['monitorGraphData', [monitorId, startDate, endDate, location, type]],
		enabled: !!monitorId
	});
};

export default useGetMonitorGraphData;
