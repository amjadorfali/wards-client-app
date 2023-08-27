import { useMutation } from '@tanstack/react-query';
import axiosInstance from 'services/api';

const useDeleteMonitor = () => {
	return useMutation({
		mutationFn: (monitorId: string) => axiosInstance.delete(`api/task/health/${monitorId}`)
	});
};
export default useDeleteMonitor;
