import { useQuery } from '@tanstack/react-query';
import axiosInstance from 'services/api';
import { HealthCheck } from 'utils/interfaces';

interface MonitorQuery {
	data: HealthCheck[];
}
const useGetMonitors = (teamId: string) => {
	return useQuery({
		queryKey: ['monitors', teamId],
		queryFn: () => axiosInstance.get<MonitorQuery>(`api/task/health/team/${teamId}`).then((res) => res.data),
		enabled: !!teamId
	});
};
export default useGetMonitors;
