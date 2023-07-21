import React, { useLayoutEffect, useRef, useState } from 'react';
import { EChartsOption, ReactEChartsProps, ReactEcharts, RefProps } from 'config/echarts/ReactECharts';
import useEchartsTheme from 'config/echarts/useEchartsTheme';
import { generateDummyData, generateDummyUptimeData } from 'config/dummyData';
import { MetricTypes } from './Monitors/MonitorMetrics';

// interface DataItem {
// 	name: string;
// 	value: [string, number];
// }

// const data: DataItem[] = [];
// let now = new Date(2020, 1, 1);
// const oneDay = 24 * 3600 * 1000;
// let value = Math.random() * 8 - 4;

// function randomData(): DataItem {
// 	now = new Date(+now + oneDay);
// 	value += Math.random() * 8 - 4;
// 	return {
// 		name: now.toString(),
// 		value: [[now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'), Math.round(value)]
// 	};
// }

// for (let i = 0; i < 400; i++) {
// 	data.push(randomData());
// }
// Look into https://echarts.apache.org/en/option.html#series-line.data, possibly use this for future charts

// const initialOption: EChartsOption = {
// 	tooltip: {
// 		trigger: 'axis',

// 		formatter: function (params) {
// 			params = (params as CallbackDataParams[])[0];
// 			const date = new Date(params.name);
// 			return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + (params.value as Array<[]>)[1];
// 		}
// 	},
// 	xAxis: {
// 		type: 'time',
// 		splitLine: {
// 			show: false
// 		}
// 	},
// 	yAxis: {
// 		type: 'value',
// 		boundaryGap: [0, '100%'],
// 		splitLine: {
// 			show: false
// 		}
// 	},
// 	series: [
// 		{
// 			name: 'Fake Data',
// 			type: 'line',
// 			showSymbol: false,
// 			data: data
// 		}
// 	]
// }

// const generateData = () => {
// 	const now = new Date();
// 	//subtract half an hour from current date
// 	now.setMinutes(now.getMinutes() - 30);
// 	const data: DataItem[] = [];

// 	for (let i = 0; i < 30; i++) {
// 		now.setMinutes(now.getMinutes() + 5);
// 		const value = Math.random() * 100 - 1;
// 		data.push({
// 			name: now.toString(),
// 			value: [now.toISOString(), Math.round(value)]
// 		});
// 	}
// 	return data;
// };

const initialOption: EChartsOption = {
	tooltip: {
		trigger: 'axis'
	},
	legend: {
		data: ['EU', 'US', 'AE', 'AU'],
		right: 10,
		padding: 10
	},
	grid: {
		left: '3%',
		right: '4%',
		bottom: '3%',
		containLabel: true
	},

	xAxis: {
		type: 'time',
		splitLine: { show: false }
	},
	dataZoom: [],
	yAxis: {
		type: 'value',
		axisLabel: {
			formatter(value) {
				return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value.toString();
			}
		},
		splitLine: {
			show: false
		}
	},
	series: [
		{
			name: 'EU',
			type: 'line',
			showSymbol: false,
			data: generateDummyData([200, 311])
		},
		{
			name: 'US',
			type: 'line',
			showSymbol: false,
			data: generateDummyData([100, 3, 400])
		},
		{
			name: 'AE',
			type: 'line',
			showSymbol: false,
			data: generateDummyData([30])
		},
		{
			name: 'AU',
			type: 'line',
			showSymbol: false,
			data: generateDummyData([])
		}
	]
};

const upTimeSeries: EChartsOption = {
	...initialOption,
	yAxis: {
		type: 'value',
		axisLabel: {
			formatter(value) {
				return `${value}%`;
			}
		},
		splitLine: {
			show: false
		}
	},
	series: [
		{
			name: 'Percentage',
			type: 'line',
			showSymbol: false,
			data: generateDummyUptimeData()
		}
	]
};

interface Props {
	ReactChartsComponentProps?: Omit<ReactEChartsProps, 'option'>;
	metricType: MetricTypes;
}
const ResponseTimeChart: React.FC<Props> = ({ ReactChartsComponentProps, metricType }) => {
	useEchartsTheme();
	const [option, setOption] = useState<EChartsOption>(initialOption);
	const chartRef = useRef<RefProps>(null);

	useLayoutEffect(() => {
		chartRef.current?.clear();
		switch (metricType) {
			case MetricTypes.UPTIME:
				setOption(upTimeSeries);

				break;

			case MetricTypes.RESPONSE_TIME:
			default:
				setOption(initialOption);

				break;
		}
	}, [metricType]);
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

	return option ? <ReactEcharts {...ReactChartsComponentProps} option={option} ref={chartRef} /> : <></>;
};

export default ResponseTimeChart;
