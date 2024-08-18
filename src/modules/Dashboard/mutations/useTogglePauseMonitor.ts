import { useMutation } from '@tanstack/react-query';

const useTogglePauseMonitor = () => {
	return useMutation({
		mutationFn: (monitorId: string) => Promise.resolve(() => ({ monitorId }))
	});
};
export default useTogglePauseMonitor;
