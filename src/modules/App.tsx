import React, { useMemo } from 'react';
import { CssBaseline, ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { LandingPage } from 'modules/Root/Pages/LandingPage';
import { RoutesConfig } from 'config/Routes/routeConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

/** Root Pages */
const Root = React.lazy(() => import('modules/Root/Root'));
const DummyPage = React.lazy(() => import('modules/Root/Pages/DummyPage/DummyPage'));
const AuthRouteGuard = React.lazy(() => import('modules/Root/Pages/Auth/AuthRouteGuard'));
const SignIn = React.lazy(() => import('modules/Root/Pages/Auth/SignIn'));
const SignUp = React.lazy(() => import('modules/Root/Pages/Auth/SignUp'));
/** Root Pages End */

/** Dashboard Pages */
const DashboardHome = React.lazy(() => import('modules/Dashboard/Dashboard'));
const Monitors = React.lazy(() => import('modules/Dashboard/Pages/Monitors'));

/** Dashboard Pages End*/

const queryClient = new QueryClient();

const App: React.FC = () => {
	//TODO : Choose appropriate colors https://m2.material.io/inline-tools/color/
	const rootTheme = responsiveFontSizes(
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

	const dashboardTheme = useMemo(
		() => ({ ...rootTheme, palette: { ...rootTheme.palette, background: { default: '#222939', paper: '#343c4bd7' } } }),
		[rootTheme]
	);

	//TODO: Add to notion https://betterstack.com/uptime?_ga=2.146380724.1853390323.1686930936-684077241.1686930936&_gl=1*1xj9iun*_gcl_au*MTgwNDcyNzA3OC4xNjg2OTMwOTM2
	//Read more https://m2.material.io/design/color/the-color-system.html
	const router = createBrowserRouter([
		{
			path: RoutesConfig.home,
			element: (
				<ThemeProvider theme={rootTheme}>
					<CssBaseline />
					<Root />
				</ThemeProvider>
			),
			errorElement: <h1>Oops, something went wrong, please try again shortly</h1>,
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
					element: (
						<AuthRouteGuard>
							<SignIn />
						</AuthRouteGuard>
					),
					path: RoutesConfig.signIn
				},
				{
					element: (
						<AuthRouteGuard>
							<SignUp />
						</AuthRouteGuard>
					),
					path: RoutesConfig.signUp
				},
				{
					// Route guard
					path: '*',
					element: <Navigate to={RoutesConfig.home} replace />
				}
			]
		},
		{
			path: RoutesConfig.dashboard,
			element: (
				<ThemeProvider theme={dashboardTheme}>
					<CssBaseline />
					<DashboardHome />
				</ThemeProvider>
			),
			errorElement: <h1>Oops, something went wrong, please try again shortly</h1>,

			children: [
				{
					path: RoutesConfig.monitors,
					element: <Monitors />
				},
				{
					element: <DummyPage />,
					path: RoutesConfig.dummy
				},
				{
					/** Route Guards */
					index: true,
					element: <Navigate to={RoutesConfig.monitors} replace />
				},
				{
					path: '*',
					element: <Navigate to={RoutesConfig.monitors} replace />
					/** Route Guards end */
				}
			]
		}
	]);

	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />

			<ToastContainer />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default App;
