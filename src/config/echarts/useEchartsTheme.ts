import { useEffect } from 'react';
import { registerTheme } from 'echarts/core';
import data from './echarts.theme.json';

const useEchartsTheme = () => {
	useEffect(() => {
		registerTheme('custom-theme', data);
	}, []);
};

export default useEchartsTheme;
