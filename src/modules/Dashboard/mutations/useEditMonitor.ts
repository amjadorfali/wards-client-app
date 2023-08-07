import { useMutation } from '@tanstack/react-query';
import axiosInstance from 'services/api';
import { CreateMonitorOptions } from './useCreateMonitor';
import { DeepPartial } from 'react-hook-form';

const useEditMonitor = () => {
	return useMutation({
		// FIXME: Fix route path
		mutationFn: (inputs: DeepPartial<CreateMonitorOptions>) => axiosInstance.post('api/task/health/', inputs)
	});
};
export default useEditMonitor;
