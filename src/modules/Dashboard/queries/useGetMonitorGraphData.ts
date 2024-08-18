import { UseQueryResult } from '@tanstack/react-query';
import { dummyRQConfig } from 'utils/dummy-config';

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

const useGetMonitorGraphData = (): UseQueryResult<HealthCheckGraphQuery, unknown> => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	return {
		...dummyRQConfig,
		data: {
			data: {
				p10: [],
				p50: [],
				p90: [],
				p95: [],
				p99: []
			}
		}
	};

	// useQuery({
	// 	queryFn: () =>
	// 		axiosInstance
	// 			.get<HealthCheckGraphQuery>('/api/health/graph', {
	// 				params: {
	// 					startDate,
	// 					endDate,
	// 					location,
	// 					taskId: monitorId,
	// 					type
	// 				},
	// 				baseURL: import.meta.env.VITE_INTERNAL_METRIC_API_HOST
	// 			})
	// 			.then((res) => res.data),
	// 	queryKey: ['monitorGraphData', [monitorId, startDate, endDate, location, type]],
	// 	enabled: !!monitorId
	// });
};

export default useGetMonitorGraphData;
