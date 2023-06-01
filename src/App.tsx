import './App.css';
import { CssBaseline, ThemeProvider, Typography, createTheme } from '@mui/material';

function App() {
	return (
		<ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
			<CssBaseline />
			<Typography className="typewriter" variant="h1">
				Hello Hello motherfucker
			</Typography>
		</ThemeProvider>
	);
}

export default App;
