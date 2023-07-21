import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { init, getInstanceByDom, use, ComposeOption, SetOptionOpts, ECharts } from 'echarts/core';
import {
	TitleComponent,
	TooltipComponent,
	TooltipComponentOption,
	GridComponent,
	GridComponentOption,
	LegendComponent,
	LegendComponentOption,
	DataZoomComponent,
	DataZoomComponentOption,
	TitleComponentOption
} from 'echarts/components';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { Box, SxProps, Theme } from '@mui/material';
use([
	TitleComponent,
	TooltipComponent,
	GridComponent,
	LineChart,
	CanvasRenderer,
	UniversalTransition,
	LegendComponent,
	DataZoomComponent
]);

// Combine an Option type with only required components and charts via ComposeOption
export type EChartsOption = ComposeOption<
	| TitleComponentOption
	| GridComponentOption
	| LegendComponentOption
	| LineSeriesOption
	| TooltipComponentOption
	| DataZoomComponentOption
>;

export interface ReactEChartsProps {
	option: EChartsOption;
	style?: SxProps<Theme>;
	settings?: SetOptionOpts;
	loading?: boolean;
	theme?: 'light' | 'dark' | 'custom-theme';
}

export interface RefProps {
	clear: () => void;
	showLoading: () => void;
	hideLoading: () => void;
}
/**
 *
 * @link https://dev.to/maneetgoyal/using-apache-echarts-with-react-and-typescript-optimizing-bundle-size-29l8
 */
export const ReactEcharts = forwardRef<RefProps, ReactEChartsProps>(function ReactECharts(
	{ option, style, settings, loading, theme = 'custom-theme' },
	ref
): JSX.Element {
	const chartRef = useRef<HTMLDivElement>(null);

	useImperativeHandle(ref, () => ({
		clear: () => {
			if (chartRef.current !== null) {
				const chart = getInstanceByDom(chartRef.current);
				chart?.clear();
			}
		},
		showLoading: () => {
			if (chartRef.current !== null) {
				const chart = getInstanceByDom(chartRef.current);
				chart?.showLoading();
			}
		},
		hideLoading: () => {
			if (chartRef.current !== null) {
				const chart = getInstanceByDom(chartRef.current);
				chart?.hideLoading();
			}
		}
	}));

	useEffect(() => {
		// Initialize chart
		let chart: ECharts | undefined;
		if (chartRef?.current !== null) {
			chart = init(chartRef.current, theme, { renderer: 'canvas' });
		}

		// Add chart resize listener
		// ResizeObserver is leading to a bit janky UX
		function resizeChart() {
			chart?.resize();
		}
		window.addEventListener('resize', resizeChart);

		// Return cleanup function
		return () => {
			chart?.dispose();
			window.removeEventListener('resize', resizeChart);
		};
	}, [theme]);

	useEffect(() => {
		// Update chart
		if (chartRef.current !== null) {
			const chart = getInstanceByDom(chartRef.current);
			chart?.setOption(option, settings);
		}
	}, [option, settings, theme]); // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function

	useEffect(() => {
		// Update chart
		if (chartRef.current !== null) {
			const chart = getInstanceByDom(chartRef.current);
			loading === true ? chart?.showLoading() : chart?.hideLoading();
		}
	}, [loading, theme]);

	return <Box ref={chartRef} sx={{ width: '100%', height: '100px', ...style }} />;
});
