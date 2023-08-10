import { useQuery } from '@tanstack/react-query';
import axiosInstance from 'services/api';
import { HealthCheck } from 'utils/interfaces';

interface HealthCheckQuery {
	data: HealthCheck;
}

const useGetMonitorDetails = (monitorId?: string) => {
	return useQuery({
		queryFn: () => axiosInstance.get<HealthCheckQuery>(`/api/task/health/${monitorId}`).then((res) => res.data),
		queryKey: ['monitorDetails', monitorId],
		enabled: !!monitorId
	});
};

export default useGetMonitorDetails;
