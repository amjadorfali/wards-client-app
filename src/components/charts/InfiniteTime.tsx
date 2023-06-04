import React, { useEffect, useState } from 'react';
import { EChartsOption, ReactECharts, ReactEChartsProps } from 'config/echarts/ReactECharts';
import type { CallbackDataParams } from 'echarts/types/dist/shared';

interface DataItem {
	name: string;
	value: [string, number];
}

function randomData(): DataItem {
	now = new Date(+now + oneDay);
	value = value + Math.random() * 21 - 10;
	return {
		name: now.toString(),
		value: [[now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'), Math.round(value)]
	};
}

const data: DataItem[] = [];
let now = new Date(1997, 9, 3);
const oneDay = 24 * 3600 * 1000;
let value = Math.random() * 1000;
for (let i = 0; i < 1000; i++) {
	data.push(randomData());
}

const initialOption: EChartsOption = {
	tooltip: {
		trigger: 'axis',

		formatter: function (params) {
			params = (params as CallbackDataParams[])[0];
			const date = new Date(params.name);
			return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + (params.value as Array<[]>)[1];
		},

		axisPointer: {
			animation: false
		}
	},
	xAxis: {
		type: 'time',
		splitLine: {
			show: false
		},
		animation: true
	},
	yAxis: {
		type: 'value',
		boundaryGap: [0, '100%'],
		splitLine: {
			show: false
		},
		animation: true
	},
	series: [
		{
			name: 'Fake Data',
			type: 'line',
			showSymbol: false,
			data: data
		}
	],
	stateAnimation: {
		easing: 'cubicOut',
		duration: 300
	},
	animation: 'auto',
	animationDuration: 1000,
	animationDurationUpdate: 500,
	animationEasing: 'cubicInOut',
	animationEasingUpdate: 'cubicInOut',
	animationThreshold: 2000,
	progressiveThreshold: 3000,
	progressive: 400,
	hoverLayerThreshold: 3000,
	useUTC: false
};

interface Props {
	ReactChartsComponentProps?: Omit<ReactEChartsProps, 'option'>;
}
const InfiniteTime: React.FC<Props> = ({ ReactChartsComponentProps }) => {
	const [option, setOptions] = useState<EChartsOption>(initialOption);
	useEffect(() => {
		const interval = setInterval(function () {
			for (let i = 0; i < 5; i++) {
				data.shift();
				data.push(randomData());
			}

			setOptions((prev) => ({
				...prev,
				series: [
					{
						data: data
					}
				]
			}));
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return <ReactECharts {...ReactChartsComponentProps} option={option} />;
};

export default InfiniteTime;
