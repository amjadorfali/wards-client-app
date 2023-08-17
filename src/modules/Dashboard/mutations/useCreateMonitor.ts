import { useMutation } from '@tanstack/react-query';
import axiosInstance from 'services/api';

export interface CreateMonitorOptions {
	teamId: string;
	name: string;
	url: string;
	method: string;
	timeout: number;
	type: string;
	interval: number;
	locations: string[];
	metadata: {
		verifySSL: boolean;
		headers: { key: string; value: string }[];
		assertions: { type: string; key: string; value: string; compareType: string }[];
		requestBody: string;
		httpUserName: string;
		httpPassword: string;
	};
}
const useCreateMonitor = () => {
	return useMutation({
		mutationFn: (inputs: CreateMonitorOptions) => axiosInstance.post('api/task/health/', inputs)
	});
};
export default useCreateMonitor;