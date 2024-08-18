import { UseQueryResult } from '@tanstack/react-query';
import { dummyRQConfig } from 'utils/dummy-config';
import { HealthCheck } from 'utils/interfaces';

interface HealthCheckQuery {
	data: HealthCheck;
}

const useGetMonitorDetails = (): UseQueryResult<HealthCheckQuery, unknown> => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	return {
		...dummyRQConfig,
		data: {
			data: {
				assertionId: 1,
				createdAt: new Date(),
				enabled: true,
				id: '1',
				interval: 1,
				lastChecked: new Date(),
				locations: ['Dubai'],
				method: 'GET',
				name: '1',
				timeout: 1,
				updatedAt: new Date(),
				type: 'HTTP',
				url: 'localhost:3000',
				teamId: 1,
				metadata: {
					assertions: [],
					headers: [],
					httpPassword: 'password',
					httpUserName: 'username',
					id: 1,
					requestBody: 'requestBody',
					verifySSL: true
				},
				inProgress: false
			}
		}
	};

	// useQuery({
	// 	queryFn: () => axiosInstance.get<HealthCheckQuery>(`/api/task/health/${monitorId}`).then((res) => res.data),
	// 	queryKey: ['monitorDetails', monitorId],
	// 	enabled: !!monitorId
	// });
};

export default useGetMonitorDetails;
