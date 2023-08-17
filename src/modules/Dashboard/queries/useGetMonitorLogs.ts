import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import axiosInstance from 'services/api';
import { formatDateFilters } from 'utils/formatDateFilters';
import { DateFilter } from 'utils/interfaces';

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
const useGetMonitorLogs = (selectedDates: DateFilter, offset = 0, limit = 0, monitorId?: string, incidentsOnly = false) => {
	const { endDate, startDate } = useMemo(() => formatDateFilters(selectedDates), [selectedDates]);

	return useQuery({
		queryFn: () =>
			axiosInstance
				.put<HealthCheckLogsQuery>(
					'/api/health/logs',
					{
						offset,
						limit,
						incidentsOnly,
						taskId: monitorId,
						startDate,
						endDate
					},
					{ baseURL: import.meta.env.VITE_INTERNAL_METRIC_API_HOST }
				)
				.then((res) => res.data),
		queryKey: ['monitorLogs', monitorId, startDate, endDate, offset, limit, incidentsOnly],
		enabled: !!monitorId
	});
};

export default useGetMonitorLogs;
