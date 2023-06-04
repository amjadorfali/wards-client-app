import { useRef, useEffect, CSSProperties } from 'react';
import { init, getInstanceByDom, use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
	GridComponent,
	TooltipComponent
	// LegendComponent,
	// ToolboxComponent,
	// TitleComponent,
	// DataZoomComponent
} from 'echarts/components';
// import { UniversalTransition } from 'echarts/features';

import type { ECharts, ComposeOption, SetOptionOpts } from 'echarts/core';
import type { LineSeriesOption } from 'echarts/charts';
import type { GridComponentOption, TooltipComponentOption } from 'echarts/components';
// Register the required components
use([
	LineChart,
	GridComponent,
	TooltipComponent,
	CanvasRenderer // If you only need to use the canvas rendering mode, the bundle will not include the SVGRenderer module, which is not needed.

	// LegendComponent,
	// TitleComponent,
	// ToolboxComponent, // A group of utility tools, which includes export, data view, dynamic type switching, data area zooming, and reset.
	// DataZoomComponent, // Used in Line Graph Charts
	// UniversalTransition
]);

// Combine an Option type with only required components and charts via ComposeOption
export type EChartsOption = ComposeOption<
	// | TitleComponentOption
	| GridComponentOption
	// LegendComponentOption |
	| LineSeriesOption
	| TooltipComponentOption
>;

export interface ReactEChartsProps {
	option: EChartsOption;
	style?: CSSProperties;
	settings?: SetOptionOpts;
	loading?: boolean;
	theme?: 'light' | 'dark' | 'custom-theme';
}

/**
 *
 * @link https://dev.to/maneetgoyal/using-apache-echarts-with-react-and-typescript-optimizing-bundle-size-29l8
 */
export function ReactECharts({ option, style, settings, loading, theme = 'custom-theme' }: ReactEChartsProps): JSX.Element {
	const chartRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Initialize chart
		let chart: ECharts | undefined;
		if (chartRef.current !== null) {
			chart = init(chartRef.current, theme);
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

	return <div ref={chartRef} style={{ width: '100%', height: '100px', ...style }} />;
}
