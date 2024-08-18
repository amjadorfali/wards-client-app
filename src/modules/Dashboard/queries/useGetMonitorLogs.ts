import { UseQueryResult } from '@tanstack/react-query';
import { dummyRQConfig } from 'utils/dummy-config';

export type AssertionResult = { message: string; isAssertionFailed: boolean };
export interface HealthCheckLogs {
	errreason?: string;
	method: string;
	region: string;
	responsecode: number;
	responsetime: number;
	status: number;
	taskid: string;
	timestamp: string;
	assertions?: AssertionResult[];
	fullcount?: string;
}
interface HealthCheckLogsQuery {
	data: HealthCheckLogs[];
}
const useGetMonitorLogs = (): UseQueryResult<HealthCheckLogsQuery, unknown> => {
	// const { endDate, startDate } = useMemo(() => formatDateFilters(selectedDates), [selectedDates]);

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	return {
		...dummyRQConfig,
		data: { data: [] }
	};

	// useQuery({
	// 	queryFn: () =>
	// 		axiosInstance
	// 			.put<HealthCheckLogsQuery>(
	// 				'/api/health/logs',
	// 				{
	// 					offset,
	// 					limit,
	// 					incidentsOnly,
	// 					taskId: monitorId,
	// 					startDate,
	// 					endDate
	// 				},
	// 				{ baseURL: import.meta.env.VITE_INTERNAL_METRIC_API_HOST }
	// 			)
	// 			.then((res) => res.data),
	// 	queryKey: ['monitorLogs', monitorId, startDate, endDate, offset, limit, incidentsOnly],
	// 	enabled: !!monitorId
	// });
};

export default useGetMonitorLogs;
