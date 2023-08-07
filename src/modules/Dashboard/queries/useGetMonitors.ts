import { useQuery } from '@tanstack/react-query';
import axiosInstance from 'services/api';

const useGetMonitors = (teamId: string) => {
	return useQuery({
		queryKey: ['monitors', teamId],
		// FIXME: Fix TS
		queryFn: () => axiosInstance.get(`api/task/health/team/${teamId}`),
		enabled: !!teamId
	});
};
export default useGetMonitors;
