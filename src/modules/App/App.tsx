import React from 'react';
import { CssBaseline, ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material';

const LandingPage = React.lazy(() => import('../Pages/LandingPage/LandingPage'));

interface CustomBg {
	secondaryGradient: string;
	primary: string;
	gradient: string;
	header: string;
	tertiaryGradient: string;
}

declare module '@mui/material/styles' {
	interface Palette {
		customBg: CustomBg;
		lighterPrimary: {
			1: string;
			2: string;
			3: string;
			4: string;
		};
		darkerPrimary: string;
		tertiary?: string;
		textTertiary?: string;
	}
	interface PaletteOptions {
		customBg?: CustomBg;
		lighterPrimary?: {
			1: string;
			2: string;
			3: string;
			4: string;
		};
		darkerPrimary?: string;
		tertiary?: string;
		textTertiary?: string;
	}
}

const App: React.FC = () => {
	//TODO: Think of an alternative to this (Wide range of colors)
	const theme = responsiveFontSizes(
		createTheme({
			palette: {
				mode: 'light',
				primary: {
					main: '#7855FF'
				},
				secondary: {
					main: '#E8E3FD'
				},
				text: {
					primary: '#101012',
					secondary: '#FFFF'
				},
				textTertiary: '#9593a8',
				//TODO: If possible, make this into a component config instead
				customBg: {
					primary: '#111013',
					gradient: `radial-gradient(94% 58.3%at 50.3% 82.6%,#2a2541 0%, #111013 100%)`,
					secondaryGradient: `radial-gradient(75% 50%at 50% 44.9%,#352541 0%,#111013 100%)`,
					tertiaryGradient: `radial-gradient(94% 92.9%at 100% 96.1%,#413025 0%, #111013 100%)`,
					header: 'rgba(17, 16, 19, 0.87)'
				},
				darkerPrimary: '#413025',
				tertiary: '#ffcbad',
				lighterPrimary: {
					'1': '#e563b0',
					'2': '#e76fd1',
					'3': '#ea80ff',
					'4': '#ae70ff'
				}
			},
			typography: {
				h1: {
					fontWeight: 700,
					fontSize: 90
				},
				h2: {
					fontWeight: 700,
					fontSize: 72
				},
				h3: {
					fontSize: 56,
					fontWeight: 700
				},
				h4: {
					fontSize: 38,
					fontWeight: 700
				},
				subtitle1: {
					fontWeight: 400,
					fontSize: 28,
					color: '#9593a8'
				},
				subtitle2: {
					fontWeight: 400,
					fontSize: 20,
					color: '#9593a8'
				}
			}
		})
	);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<LandingPage />
		</ThemeProvider>
	);
};

export default App;
