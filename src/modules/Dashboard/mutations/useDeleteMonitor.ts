import { useMutation } from '@tanstack/react-query';

const useDeleteMonitor = () => {
	return useMutation({
		mutationFn: (monitorId: string) => Promise.resolve(() => ({ monitorId }))
	});
};
export default useDeleteMonitor;
