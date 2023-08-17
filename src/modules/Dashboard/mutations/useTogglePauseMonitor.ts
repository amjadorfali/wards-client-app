import { useMutation } from '@tanstack/react-query';
import axiosInstance from 'services/api';

const useTogglePauseMonitor = () => {
	return useMutation({
		mutationFn: (monitorId: string) => axiosInstance.put(`api/task/health/${monitorId}/toggle`)
	});
};
export default useTogglePauseMonitor;
