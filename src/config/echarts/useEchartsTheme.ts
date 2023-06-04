import { useEffect } from 'react';
import * as echarts from 'echarts/core';
import data from './echarts.theme.json';

const useEchartsTheme = () => {
	useEffect(() => {
		echarts.registerTheme('custom-theme', data);
	}, []);
};

export default useEchartsTheme;
