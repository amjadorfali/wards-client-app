import { UseQueryResult } from '@tanstack/react-query';
import { dummyRQConfig } from 'utils/dummy-config';
import { HealthCheck } from 'utils/interfaces';

interface MonitorQuery {
	data: HealthCheck[];
}
const useGetMonitors = (): UseQueryResult<MonitorQuery, unknown> => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return {
		...dummyRQConfig,
		data: {
			data: [
				{
					url: 'localhost:3000',
					assertionId: 1,
					createdAt: new Date(),
					enabled: true,
					inProgress: false,

					id: '1',
					interval: 1,
					lastChecked: new Date(),
					name: '1',
					locations: ['Dubai'],
					method: 'GET',
					teamId: 1,
					timeout: 1,
					updatedAt: new Date(),
					type: 'HTTP',
					metadata: {
						verifySSL: true,
						assertions: [],
						headers: [],
						httpPassword: 'password',
						httpUserName: 'username',
						id: 1,
						requestBody: 'requestBody'
					}
				}
			]
		}
	};

	// useQuery({
	// 	queryKey: ['monitors', teamId],
	// 	queryFn: () => axiosInstance.get<MonitorQuery>(`api/task/health/team/${teamId}`).then((res) => res.data),
	// 	enabled: !!teamId
	// });
};
export default useGetMonitors;
