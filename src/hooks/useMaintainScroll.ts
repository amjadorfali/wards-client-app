import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
export const SS_KEY_scroll = 'scroll-position';
const useMaintainScroll = () => {
	const { pathname } = useLocation();
	useEffect(() => {
		const scrollPositions = JSON.parse(sessionStorage.getItem(SS_KEY_scroll) || '{}') as { [key: string]: number };
		if (scrollPositions[pathname]) {
			window.scrollTo({ behavior: 'smooth', top: scrollPositions[pathname] });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};

export default useMaintainScroll;
