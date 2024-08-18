import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { EChartsOption, ReactEChartsProps, ReactEcharts, RefProps } from 'config/echarts/ReactECharts';
import useEchartsTheme from 'config/echarts/useEchartsTheme';
import { MetricTypes } from './Monitors/MonitorMetrics';

import { GraphData, OneDayData, Percentile, ResponseTimePercentiles, UptimeData } from '../queries/useGetMonitorGraphData';
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
		trigger: 'axis',
		valueFormatter: (option) => `${option.toString()} ms`
	},
	legend: {
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
	}
	// series: [
	// 	{
	// 		name: 'EU',
	// 		type: 'line',
	// 		showSymbol: false,
	// 		data: generateDummyData([200, 311])
	// 	},
	// 	{
	// 		name: 'US',
	// 		type: 'line',
	// 		showSymbol: false,
	// 		data: generateDummyData([100, 3, 400])
	// 	},
	// 	{
	// 		name: 'AE',
	// 		type: 'line',
	// 		showSymbol: false,
	// 		data: generateDummyData([30])
	// 	},
	// 	{
	// 		name: 'AU',
	// 		type: 'line',
	// 		showSymbol: false,
	// 		data: generateDummyData([])
	// 	}
	// ]
};

const uptimeOptions: EChartsOption = {
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
	tooltip: {
		trigger: 'axis',
		valueFormatter: (option) => `${option.toString()} %`
	}
};

interface Props {
	ReactChartsComponentProps?: Omit<ReactEChartsProps, 'option'>;
	metricType: MetricTypes;
	metrics?: GraphData;
	options?: {
		isSameDay?: boolean;
		withLocation?: boolean;
	};
}

type SeriesData = {
	name: string;
	type: 'line';
	showSymbol: boolean;
	data: {
		name: string;
		value: (string | number)[];
	}[];
}[];

// export interface ResponseTimePercentiles {
// 	p10: Percentile[];
// 	p50: Percentile[];
// 	p90: Percentile[];
// 	p95: Percentile[];
// 	p99: Percentile[];
// }

// export type OneDayData = {
// 	region: string;
// 	data: {
// 		responseTime: number;
// 		status: number;
// 		timestamp: string;
// 	}[];
// }[];

// export type UptimeData = {
// 	region: string;
// 	data: {
// 		average_status_percentage: number;
// 		timestamp: string;
// 	}[];
// }[];

const oneDayUptimeDummyData: OneDayData = [
	{
		region: 'EU',
		data: [
			{
				responseTime: 200,
				status: 100,
				timestamp: '2021-09-29T13:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-29T14:00:00.000Z'
			},

			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-29T15:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-29T16:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-29T17:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-29T18:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-29T19:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-29T20:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-29T21:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-29T22:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-29T23:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-30T00:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-30T01:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-30T02:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-30T03:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-30T04:00:00.000Z'
			},

			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-30T05:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-30T06:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-30T07:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-30T08:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-30T09:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-30T10:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-30T11:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-30T12:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-30T13:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-30T14:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-30T15:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-30T16:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-30T17:00:00.000Z'
			},

			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-30T18:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-30T19:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-30T20:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-30T21:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-30T22:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-30T23:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-10-01T00:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-10-01T01:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-10-01T02:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-10-01T03:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-10-01T04:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-10-01T05:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-10-01T06:00:00.000Z'
			}
		]
	},
	{
		region: 'US',
		data: [
			{
				responseTime: 100,
				status: 100,
				timestamp: '2021-09-29T13:00:00.000Z'
			},
			{
				responseTime: 3,
				status: 90,
				timestamp: '2021-09-29T14:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-29T15:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-29T16:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-29T17:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 80,
				timestamp: '2021-09-29T18:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-29T19:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-29T20:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-29T21:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-29T22:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-29T23:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-30T00:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-30T01:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-30T02:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-30T03:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-30T04:00:00.000Z'
			},

			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-30T05:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-30T06:00:00.000Z'
			},

			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-30T07:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-30T08:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-30T09:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-30T10:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-30T11:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-30T12:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-30T13:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-30T14:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-30T15:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-30T16:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-30T17:00:00.000Z'
			},

			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-30T18:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-30T19:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 60,
				timestamp: '2021-09-30T20:00:00.000Z'
			},

			{
				responseTime: 400,
				status: 40,
				timestamp: '2021-09-30T21:00:00.000Z'
			},

			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-30T22:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-30T23:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-10-01T00:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-10-01T01:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-10-01T02:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-10-01T03:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-10-01T04:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-10-01T05:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-10-01T06:00:00.000Z'
			}
		]
	}
];

const oneDayResponseTimeDummyData: OneDayData = [
	{
		region: 'EU',
		data: [
			{
				responseTime: 200,
				status: 100,
				timestamp: '2021-09-29T13:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-29T14:00:00.000Z'
			},

			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-29T15:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-29T16:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-29T17:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-29T18:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-29T19:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-29T20:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-29T21:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-29T22:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-29T23:00:00.000Z'
			},
			{
				responseTime: 311,
				status: 100,
				timestamp: '2021-09-30T00:00:00.000Z'
			}
		]
	},
	{
		region: 'US',
		data: [
			{
				responseTime: 100,
				status: 100,
				timestamp: '2021-09-29T13:00:00.000Z'
			},
			{
				responseTime: 3,
				status: 90,
				timestamp: '2021-09-29T14:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-29T15:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-29T16:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-29T17:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 80,
				timestamp: '2021-09-29T18:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-29T19:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-29T20:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-29T21:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-29T22:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-29T23:00:00.000Z'
			},
			{
				responseTime: 400,
				status: 100,
				timestamp: '2021-09-30T00:00:00.000Z'
			}
		]
	}
];

const uptimeData: UptimeData = [
	{
		region: 'EU',
		data: [
			{
				average_status_percentage: 100,
				timestamp: '2021-09-29T13:00:00.000Z'
			},
			{
				average_status_percentage: 100,
				timestamp: '2021-09-29T14:00:00.000Z'
			},
			{
				average_status_percentage: 100,
				timestamp: '2021-09-29T15:00:00.000Z'
			},
			{
				average_status_percentage: 100,
				timestamp: '2021-09-29T16:00:00.000Z'
			},
			{
				average_status_percentage: 100,
				timestamp: '2021-09-29T17:00:00.000Z'
			},
			{
				average_status_percentage: 100,
				timestamp: '2021-09-29T18:00:00.000Z'
			},
			{
				average_status_percentage: 100,
				timestamp: '2021-09-29T19:00:00.000Z'
			},
			{
				average_status_percentage: 100,
				timestamp: '2021-09-29T20:00:00.000Z'
			},
			{
				average_status_percentage: 100,
				timestamp: '2021-09-29T21:00:00.000Z'
			},
			{
				average_status_percentage: 100,
				timestamp: '2021-09-29T22:00:00.000Z'
			},
			{
				average_status_percentage: 100,
				timestamp: '2021-09-29T23:00:00.000Z'
			},
			{
				average_status_percentage: 100,
				timestamp: '2021-09-30T00:00:00.000Z'
			},
			{
				average_status_percentage: 100,
				timestamp: '2021-09-30T01:00:00.000Z'
			},
			{
				average_status_percentage: 100,
				timestamp: '2021-09-30T02:00:00.000Z'
			},
			{
				average_status_percentage: 100,
				timestamp: '2021-09-30T03:00:00.000Z'
			}
		]
	},
	{
		region: 'US',
		data: [
			{
				average_status_percentage: 100,
				timestamp: '2021-09-29T13:00:00.000Z'
			},
			{
				average_status_percentage: 90,
				timestamp: '2021-09-29T14:00:00.000Z'
			},
			{
				average_status_percentage: 100,
				timestamp: '2021-09-29T15:00:00.000Z'
			},
			{
				average_status_percentage: 100,
				timestamp: '2021-09-29T16:00:00.000Z'
			},
			{
				average_status_percentage: 100,
				timestamp: '2021-09-29T17:00:00.000Z'
			},
			{
				average_status_percentage: 80,
				timestamp: '2021-09-29T18:00:00.000Z'
			},
			{
				average_status_percentage: 100,
				timestamp: '2021-09-29T19:00:00.000Z'
			},
			{
				average_status_percentage: 100,
				timestamp: '2021-09-29T20:00:00.000Z'
			},
			{
				average_status_percentage: 100,
				timestamp: '2021-09-29T21:00:00.000Z'
			},
			{
				average_status_percentage: 100,
				timestamp: '2021-09-29T22:00:00.000Z'
			},
			{
				average_status_percentage: 100,
				timestamp: '2021-09-29T23:00:00.000Z'
			},
			{
				average_status_percentage: 100,
				timestamp: '2021-09-30T00:00:00.000Z'
			},
			{
				average_status_percentage: 100,
				timestamp: '2021-09-30T01:00:00.000Z'
			},
			{
				average_status_percentage: 100,
				timestamp: '2021-09-30T02:00:00.000Z'
			}
		]
	}
];
const responseTimeData: ResponseTimePercentiles = {
	p10: [
		{ responseTime: 200, timestamp: '2021-09-29T13:00:00.000Z' },
		{ responseTime: 400, timestamp: '2021-09-29T14:00:00.000Z' },
		{ responseTime: 30, timestamp: '2021-09-29T15:00:00.000Z' },
		{ responseTime: 100, timestamp: '2021-09-29T16:00:00.000Z' },
		{ responseTime: 320, timestamp: '2021-09-29T17:00:00.000Z' },
		{ responseTime: 400, timestamp: '2021-09-29T18:00:00.000Z' },
		{ responseTime: 100, timestamp: '2021-09-29T19:00:00.000Z' },
		{ responseTime: 400, timestamp: '2021-09-29T20:00:00.000Z' },
		{ responseTime: 200, timestamp: '2021-09-29T21:00:00.000Z' },
		{ responseTime: 400, timestamp: '2021-09-29T22:00:00.000Z' },
		{ responseTime: 450, timestamp: '2021-09-29T23:00:00.000Z' },
		{ responseTime: 430, timestamp: '2021-09-30T00:00:00.000Z' }
	],
	p50: [
		{ responseTime: 200, timestamp: '2021-09-29T13:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T14:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T15:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T16:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T17:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T18:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T19:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T20:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T21:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T22:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T23:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-30T00:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-30T00:00:00.000Z' }
	],
	p90: [
		{ responseTime: 200, timestamp: '2021-09-29T13:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T14:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T15:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T16:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T17:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T18:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T19:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T20:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T21:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T22:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T23:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-30T00:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-30T00:00:00.000Z' }
	],
	p95: [
		{ responseTime: 200, timestamp: '2021-09-29T13:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T14:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T15:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T16:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T17:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T18:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T19:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T20:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T21:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T22:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T23:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-30T00:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-30T00:00:00.000Z' }
	],
	p99: [
		{ responseTime: 200, timestamp: '2021-09-29T13:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T14:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T15:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T16:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T17:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T18:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T19:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T20:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T21:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T22:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-29T23:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-30T00:00:00.000Z' },
		{ responseTime: 311, timestamp: '2021-09-30T00:00:00.000Z' }
	]
};
const ResponseTimeChart: React.FC<Props> = ({ ReactChartsComponentProps, metricType, options }) => {
	const metrics = useMemo<GraphData>(() => {
		if (options?.isSameDay) {
			if (metricType === MetricTypes.UPTIME) {
				return oneDayUptimeDummyData;
			} else {
				return oneDayResponseTimeDummyData;
			}
		} else if (metricType === MetricTypes.UPTIME) {
			return uptimeData;
		} else {
			return responseTimeData;
		}
	}, [metricType, options?.isSameDay]);
	// const metrics: GraphData = metricType === MetricTypes.RESPONSE_TIME ? generateDummyData([200, 311]) : generateDummyUptimeData();
	useEchartsTheme();
	const [option, setOption] = useState<EChartsOption>({ ...initialOption });
	const chartRef = useRef<RefProps>(null);

	useLayoutEffect(() => {
		// FIXME: Use switch for MetricTypes
		chartRef.current?.clear();
		if (metrics) {
			if (options?.isSameDay) {
				if (metricType === MetricTypes.UPTIME) {
					const data: SeriesData = (metrics as OneDayData).map((uptimeData) => ({
						name: uptimeData.region,
						type: 'line',
						showSymbol: false,
						data: uptimeData.data.map((data) => ({
							name: new Date(data.timestamp).toString(),
							value: [new Date(data.timestamp).toISOString(), data.status]
						}))
					}));
					setOption({
						...initialOption,
						...uptimeOptions,
						legend: { ...initialOption.legend, data: data.map((line) => line.name) },
						series: data
					});
				} else {
					const data: SeriesData = (metrics as OneDayData).map((uptimeData) => ({
						name: uptimeData.region,
						type: 'line',
						showSymbol: false,
						data: uptimeData.data.map((data) => ({
							name: new Date(data.timestamp).toString(),
							value: [new Date(data.timestamp).toISOString(), data.responseTime]
						}))
					}));
					setOption({
						...initialOption,
						legend: { ...initialOption.legend, data: data.map((line) => line.name) },
						series: data
					});
				}
			} else if (metricType === MetricTypes.UPTIME) {
				const data: SeriesData = (metrics as UptimeData).map((uptimeData) => ({
					name: uptimeData.region,
					type: 'line',
					showSymbol: false,
					data: uptimeData.data.map((data) => ({
						name: new Date(data.timestamp).toString(),
						value: [new Date(data.timestamp).toISOString(), data.average_status_percentage]
					}))
				}));
				setOption({
					...initialOption,
					...uptimeOptions,
					legend: { ...initialOption.legend, data: data.map((line) => line.name) },
					series: data
				});
			} else {
				const data: SeriesData = Object.entries(metrics as ResponseTimePercentiles).map(([percentileKey, percentileData]) => ({
					name: percentileKey,
					type: 'line',
					showSymbol: false,
					data: (percentileData as Percentile[]).map((data) => ({
						name: new Date(data.timestamp).toString(),
						value: [new Date(data.timestamp).toISOString(), data.responseTime]
					}))
				}));
				setOption({
					...initialOption,
					legend: { ...initialOption.legend, data: data.map((line) => line.name) },
					series: data.reverse()
				});
			}
		}
	}, [metrics, options?.isSameDay, options?.withLocation, metricType]);
	// useLayoutEffect(() => {
	// 	chartRef.current?.clear();
	// 	switch (metricType) {
	// 		case MetricTypes.UPTIME:
	// 			setOption(upTimeSeries);

	// 			break;

	// 		case MetricTypes.RESPONSE_TIME:
	// 		default:
	// 			setOption(initialOption);

	// 			break;
	// 	}
	// }, [metricType]);
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
