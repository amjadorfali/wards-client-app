import { UseQueryResult } from '@tanstack/react-query';
// import { useMemo } from 'react';
// import axiosInstance from 'services/api';
import { dummyRQConfig } from 'utils/dummy-config';
// import { formatDateFilters } from 'utils/formatDateFilters';

export interface HealthCheckOverview {
	uptime?: string;
	performance?: number;
	status?: {
		startTime: string;
		endTime: string;
		code: number;
	};
}
interface HealthCheckOverviewQuery {
	data: HealthCheckOverview;
}
const useGetMonitorOverview = (): UseQueryResult<HealthCheckOverviewQuery, unknown> => {
	// const { endDate, startDate } = useMemo(() => formatDateFilters(selectedDates), [selectedDates]);
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	return {
		...dummyRQConfig,
		data: {
			data: {
				performance: 100,
				status: {
					code: 200,

					endTime: '2021-09-29T14:00:00.000Z',
					startTime: '2021-09-29T13:00:00.000Z'
				},
				uptime: '100'
			}
		}
	};

	// useQuery({
	// 	queryFn: () =>
	// 		axiosInstance
	// 			.get<HealthCheckOverviewQuery>('/api/health/overview', {
	// 				params: {
	// 					startDate,
	// 					endDate,
	// 					taskId: monitorId
	// 				},
	// 				baseURL: import.meta.env.VITE_INTERNAL_METRIC_API_HOST
	// 			})
	// 			.then((res) => res.data),
	// 	queryKey: ['monitorOverview', [monitorId, startDate, endDate]],
	// 	enabled: !!monitorId
	// });
};

export default useGetMonitorOverview;
