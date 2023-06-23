import React, { useState } from 'react';
import { EChartsOption, ReactECharts, ReactEChartsProps } from 'config/echarts/ReactECharts';
import type { CallbackDataParams } from 'echarts/types/dist/shared';
import useEchartsTheme from 'config/echarts/useEchartsTheme';

interface DataItem {
	name: string;
	value: [string, number];
}

const data: DataItem[] = [];
let now = new Date(2020, 1, 1);
const oneDay = 24 * 3600 * 1000;
let value = Math.random() * 8 - 4;

function randomData(): DataItem {
	now = new Date(+now + oneDay);
	value += Math.random() * 8 - 4;
	return {
		name: now.toString(),
		value: [[now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'), Math.round(value)]
	};
}

for (let i = 0; i < 400; i++) {
	data.push(randomData());
}
//TODO: Look into https://echarts.apache.org/en/option.html#series-line.data

const initialOption: EChartsOption = {
	tooltip: {
		trigger: 'axis',

		formatter: function (params) {
			params = (params as CallbackDataParams[])[0];
			const date = new Date(params.name);
			return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + (params.value as Array<[]>)[1];
		}
	},
	xAxis: {
		type: 'time',
		splitLine: {
			show: false
		}
	},
	yAxis: {
		type: 'value',
		boundaryGap: [0, '100%'],
		splitLine: {
			show: false
		}
	},
	series: [
		{
			name: 'Fake Data',
			type: 'line',
			showSymbol: false,
			data: data
		}
	]
};

interface Props {
	ReactChartsComponentProps?: Omit<ReactEChartsProps, 'option'>;
}
const InfiniteTime: React.FC<Props> = ({ ReactChartsComponentProps }) => {
	const [option] = useState<EChartsOption>(initialOption);
	useEchartsTheme();
	// useEffect(() => {
	// 	const interval = setInterval(function () {
	// 		for (let i = 0; i < 10; i++) {
	// 			data.shift();
	// 			data.push(randomData());
	// 		}
	// 		setOptions((prev) => ({
	// 			...prev,
	// 			series: [
	// 				{
	// 					data: data
	// 				}
	// 			]
	// 		}));
	// 	}, 1000);

	// 	return () => clearInterval(interval);
	// }, []);

	return <ReactECharts {...ReactChartsComponentProps} option={option} />;
};

export default InfiniteTime;
