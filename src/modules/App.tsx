import React from 'react';
import { CssBaseline, ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material';
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import { LandingPage } from 'modules/Root/Pages/LandingPage';
import { RoutesConfig } from 'config/Routes/routeConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ErrorMessage from './ErrorMessage';
import Loader from 'components/loaders/Loader';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
/** Root Pages */
const Root = React.lazy(() => import('modules/Root/Root'));

const DummyPage = React.lazy(() => import('modules/Root/Pages/DummyPage/DummyPage'));
const AuthRouteGuard = React.lazy(() => import('modules/Root/Pages/Auth/AuthRouteGuard'));
const SignIn = React.lazy(() => import('modules/Root/Pages/Auth/SignIn'));
const SignUp = React.lazy(() => import('modules/Root/Pages/Auth/SignUp'));
/** Root Pages End */

/** Dashboard Pages */
const DashboardHome = React.lazy(() => import('modules/Dashboard/Dashboard'));
const TeamRouteGuard = React.lazy(() => import('./Dashboard/TeamRouteGuard'));

const Monitors = React.lazy(() => import('modules/Dashboard/Pages/Monitors/Monitors'));
const AddMonitor = React.lazy(() => import('modules/Dashboard/Pages/Monitors/AddMonitor'));
const MonitorDetails = React.lazy(() => import('modules/Dashboard/Pages/Monitors/MonitorDetails'));

const Heartbeats = React.lazy(() => import('modules/Dashboard/Pages/Heartbeats'));

const Billing = React.lazy(() => import('modules/Dashboard/Pages/Billing'));
const Help = React.lazy(() => import('modules/Dashboard/Pages/Help'));
const Settings = React.lazy(() => import('modules/Dashboard/Pages/Settings'));

const Teams = React.lazy(() => import('modules/Dashboard/Pages/Teams/Teams'));
const CreateTeam = React.lazy(() => import('modules/Dashboard/Pages/Teams/CreateTeam'));
const EditTeam = React.lazy(() => import('modules/Dashboard/Pages/Teams/EditTeam'));

/** Dashboard Pages End*/

const queryClient = new QueryClient();

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

const dashboardTheme = responsiveFontSizes(
	createTheme({
		palette: { ...rootTheme.palette, background: { default: '#222939', paper: '#293141' } },
		typography: {
			h1: {
				fontSize: 40
			},
			h2: {
				fontSize: 27
			},
			h3: {
				fontSize: 22
			},
			h4: {
				fontSize: 20
			},
			subtitle1: {
				fontSize: 18
			},
			subtitle2: {
				fontSize: 15
			},
			fontWeightMedium: 600,
			fontWeightLight: 600,
			fontWeightRegular: 400,
			body1: {
				fontSize: 18
			}
		},
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						textTransform: 'capitalize'
					}
				}
			}
		}
	})
);

const router = createBrowserRouter([
	{
		path: RoutesConfig.home,
		element: (
			<ThemeProvider theme={rootTheme}>
				<CssBaseline />
				<Loader />
				<Root />
			</ThemeProvider>
		),
		errorElement: <ErrorMessage />,
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
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<ThemeProvider theme={dashboardTheme}>
					<CssBaseline />
					<Loader />
					<Outlet />
				</ThemeProvider>
			</LocalizationProvider>
		),
		errorElement: <ErrorMessage />,

		children: [
			{
				path: RoutesConfig.dashboardTeam,
				element: <Outlet />,
				children: [
					{
						path: ':teamId',
						element: <DashboardHome />,
						children: [
							{
								path: RoutesConfig.monitors,
								element: <Outlet />,
								children: [
									{
										index: true,
										element: <Monitors />
									},
									{
										path: RoutesConfig.new,
										element: <AddMonitor />
									},
									{
										path: ':monitorId',
										element: <MonitorDetails />
									}
								]
							},
							{
								path: RoutesConfig.heartbeats,
								element: <Heartbeats />
							},
							{
								path: RoutesConfig.billing,
								element: <Billing />
							},
							{
								path: RoutesConfig.help,
								element: <Help />
							},
							{
								path: RoutesConfig.teams,
								element: <Outlet />,
								children: [
									{
										path: RoutesConfig.createTeam,
										element: <CreateTeam />
									},
									{
										path: `${RoutesConfig.editTeam}/:editTeamId`,
										element: <EditTeam />
									},
									{
										index: true,
										element: <Teams />
									}
								]
							},
							{
								path: RoutesConfig.settings,
								element: <Settings />
							},
							{
								element: <DummyPage />,
								path: RoutesConfig.dummy
							},
							{
								// Route Guard
								path: '*',
								index: true,
								element: <Navigate to={RoutesConfig.monitors} replace />
							}
						]
					},
					{
						// Route guard
						path: '*',
						index: true,
						element: <TeamRouteGuard />
					}
				]
			},
			{
				//Route guard
				path: '*',
				index: true,
				element: <Navigate to={RoutesConfig.dashboardTeam} replace />
			}
		]
	}
]);
const App: React.FC = () => {
	// Choose appropriate colors from https://m2.material.io/inline-tools/color/
	// Read more https://m2.material.io/design/color/the-color-system.html

	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			<ToastContainer hideProgressBar />
			<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
		</QueryClientProvider>
	);
};

export default App;
