import { useMutation } from '@tanstack/react-query';
import { CreateMonitorOptions } from './useCreateMonitor';
import { DeepPartial } from 'react-hook-form';

const useEditMonitor = () => {
	return useMutation({
		mutationFn: ({ monitorId, ...inputs }: DeepPartial<CreateMonitorOptions> & { monitorId: string }) =>
			Promise.resolve(() => ({ monitorId, inputs }))
	});
};
export default useEditMonitor;
