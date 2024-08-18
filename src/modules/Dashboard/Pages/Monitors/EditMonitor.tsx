import useGetMonitorDetails from 'modules/Dashboard/queries/useGetMonitorDetails';
import AddMonitor, { AssertionNames, CreatableData, ExistingMonitorDetails, Region, RequestType } from './AddMonitor';
import { useEffect, useState } from 'react';
import { HealthCheck } from 'utils/interfaces';

const getAssertions = (monitor: HealthCheck['metadata']) => {
	const assertionsCount: number[] = [];
	const headersCount: number[] = [];
	const returnObj: CreatableData = {};

	monitor.assertions.forEach((assertion, index) => {
		const num = index + 1;
		assertionsCount.push(num);
		returnObj[`assertion-name-${num}`] = assertion.type as AssertionNames;
		returnObj[`assertion-compare-${num}`] = assertion.compareType;
		returnObj[`assertion-value-${num}`] = assertion.value;
		if (assertion.key) returnObj[`assertion-key-${num}`] = assertion.key;
	});

	monitor.headers.forEach((header, index) => {
		const num = index + 1;
		headersCount.push(num);
		returnObj[`header-name-${num}`] = header.key;
		returnObj[`header-value-${num}`] = header.value;
	});

	return { assertionsCount, headersCount, ...returnObj };
};
const EditMonitor = () => {
	const { data: monitorDetails, isSuccess } = useGetMonitorDetails();

	const [existingMonitorDetails, setExistingMonitorDetails] = useState<ExistingMonitorDetails | undefined>();

	useEffect(() => {
		if (!existingMonitorDetails && isSuccess && monitorDetails.data) {
			const monitorData = monitorDetails.data;
			setExistingMonitorDetails({
				'check-frequency': monitorData.interval,
				'http-auth-password': monitorData.metadata.httpPassword,
				'http-auth-username': monitorData.metadata.httpUserName,
				'monitor-name': monitorData.name,
				'http-method': monitorData.method,
				'request-body': monitorData.metadata.requestBody,
				'request-timeout': monitorData.timeout,
				'request-type': monitorData.type as RequestType,
				'verify-ssl': monitorData.metadata.verifySSL,
				regions: monitorData.locations as Region[],
				url: monitorData.url || '',
				...getAssertions(monitorData.metadata)
			});
		}
	}, [existingMonitorDetails, isSuccess, monitorDetails?.data]);
	return isSuccess && existingMonitorDetails ? <AddMonitor edit existingMonitorDetails={existingMonitorDetails} /> : '';
};

export default EditMonitor;
