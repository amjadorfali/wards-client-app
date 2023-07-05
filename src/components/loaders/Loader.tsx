import { Backdrop, CircularProgress, useTheme } from '@mui/material';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { QUERY_KEY as CurrentSessionQueryKey } from 'modules/Root/Pages/Auth/queries/useGetCurrentSession';
import React from 'react';
const Loader: React.FC = () => {
	const theme = useTheme();
	const isLoading = !!useIsFetching({
		// Skipping the current session due to the query being null on Auth page
		// - Must fix route guard of auth or refactor loader later to be per use case instead of this global solution
		predicate: (query) => query.state.status === 'loading' && query.queryKey[0] !== CurrentSessionQueryKey
	});

	const isMutating = !!useIsMutating();

	return (
		<Backdrop sx={{ color: theme.palette.common.white, zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading || isMutating}>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};

export default Loader;
