import { UseQueryResult } from '@tanstack/react-query';

export const dummyRQConfig: Omit<UseQueryResult, 'data'> = {
	dataUpdatedAt: 0,
	error: null,
	errorUpdateCount: 0,
	status: 'success',
	isFetching: false,
	errorUpdatedAt: 0,
	failureCount: 0,
	failureReason: null,
	fetchStatus: 'idle',
	isError: false,
	isFetched: true,
	isFetchedAfterMount: true,
	isInitialLoading: false,
	isPreviousData: false,
	isLoading: false,
	isLoadingError: false,
	isPlaceholderData: false,
	isPaused: false,
	isRefetchError: false,
	isRefetching: false,
	isStale: false,
	isSuccess: true,
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	refetch: () => {
		return Promise.resolve();
	},
	remove: () => {
		return;
	}
};
