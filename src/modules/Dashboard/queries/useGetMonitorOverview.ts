import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import axiosInstance from 'services/api';
import { formatDateFilters } from 'utils/formatDateFilters';
import { DateFilter } from 'utils/interfaces';

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
const useGetMonitorOverview = (selectedDates: DateFilter, monitorId?: string) => {
	const { endDate, startDate } = useMemo(() => formatDateFilters(selectedDates), [selectedDates]);
	return useQuery({
		queryFn: () =>
			axiosInstance
				.get<HealthCheckOverviewQuery>('/api/health/overview', {
					params: {
						startDate,
						endDate,
						taskId: monitorId
					},
					baseURL: import.meta.env.VITE_INTERNAL_METRIC_API_HOST
				})
				.then((res) => res.data),
		queryKey: ['monitorOverview', [monitorId, startDate, endDate]],
		enabled: !!monitorId
	});
};

export default useGetMonitorOverview;
