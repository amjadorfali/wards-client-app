import React from 'react';
import { CssBaseline, ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { LandingPage } from 'modules/Pages/LandingPage';
import { RoutesConfig } from 'config/Routes/routeConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const Root = React.lazy(() => import('modules/Pages/Root/Root'));
const DummyPage = React.lazy(() => import('modules/Pages/DummyPage/DummyPage'));
const SignIn = React.lazy(() => import('modules/Pages/Auth/SignIn'));
const SignUp = React.lazy(() => import('modules/Pages/Auth/SignUp'));

const queryClient = new QueryClient();

const App: React.FC = () => {
	//TODO : Choose appropriate colors https://m2.material.io/inline-tools/color/
	const theme = responsiveFontSizes(
		createTheme({
			palette: {
				mode: 'dark',
				background: {
					default: '#0b0c14',
					paper: '#141521d8'
				},
				primary: {
					main: '#5c64d4'
				},

				secondary: {
					main: '#bbc2f7'
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
					fontSize: 28
				},
				subtitle2: {
					fontWeight: 400,
					fontSize: 20
				},
				body1: {
					fontSize: 20
				}
			},
			components: {
				MuiLink: {
					styleOverrides: {
						root: {
							fontSize: 16
						}
					}
				}
			}
		})
	);

	//TODO: Add to notion https://betterstack.com/uptime?_ga=2.146380724.1853390323.1686930936-684077241.1686930936&_gl=1*1xj9iun*_gcl_au*MTgwNDcyNzA3OC4xNjg2OTMwOTM2
	//Read more https://m2.material.io/design/color/the-color-system.html
	const router = createBrowserRouter([
		{
			path: RoutesConfig.home,
			element: <Root />,
			children: [
				{
					element: <LandingPage />,
					index: true
				},
				{
					element: <DummyPage />,
					path: RoutesConfig.dummy
				},
				{
					element: <SignIn />,
					path: RoutesConfig.signIn
				},
				{
					element: <SignUp />,
					path: RoutesConfig.signUp
				},
				{
					// Route guard
					path: '*',
					element: <Navigate to={RoutesConfig.home} />
				}
			]
		}
	]);

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<RouterProvider router={router} />
			</ThemeProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default App;
