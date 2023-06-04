import React from 'react';
import { CssBaseline, ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material';

import { LandingPage } from '../Pages/LandingPage';
import './App.css';
import useEchartsTheme from 'config/echarts/useEchartsTheme';
declare module '@mui/material/styles' {
	interface Palette {
		customBg: { primary: string; secondary: string; gradient: string };
	}
	interface PaletteOptions {
		customBg?: { primary: string; gradient?: string };
	}
}

const App: React.FC = () => {
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
					secondary: '#9593a8'
				},
				//TODO: If possible, make this into a component config instead
				customBg: {
					primary: '#111013',
					gradient: `radial-gradient(94% 58.3%at 50.3% 82.6%,#2a2541 0%, #111013 100%)`
				}
			}
		})
	);

	useEchartsTheme();
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<LandingPage />
		</ThemeProvider>
	);
};

export default App;
