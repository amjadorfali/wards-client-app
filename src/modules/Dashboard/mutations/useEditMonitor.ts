import { useMutation } from '@tanstack/react-query';
import axiosInstance from 'services/api';
import { CreateMonitorOptions } from './useCreateMonitor';
import { DeepPartial } from 'react-hook-form';

const useEditMonitor = () => {
	return useMutation({
		mutationFn: ({ monitorId, ...inputs }: DeepPartial<CreateMonitorOptions> & { monitorId: string }) =>
			axiosInstance.put(`api/task/health/${monitorId}`, inputs)
	});
};
export default useEditMonitor;
