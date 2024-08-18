import React from 'react';
import { Button, Divider, Grid, ListItemButton, Menu, MenuItem, MenuProps, Typography, alpha, styled, useTheme } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NetworkPingIcon from '@mui/icons-material/NetworkPing';

const StyledMenu = styled((props: MenuProps) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'right'
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'right'
		}}
		{...props}
	/>
))(({ theme }) => ({
	'& .MuiPaper-root': {
		borderRadius: 6,
		marginTop: theme.spacing(1),
		minWidth: 180,
		color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
		boxShadow:
			'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
		'& .MuiMenu-list': {
			padding: '4px 0'
		},
		'& .MuiMenuItem-root': {
			'& .MuiSvgIcon-root': {
				fontSize: 18,
				color: theme.palette.text.secondary,
				marginRight: theme.spacing(1.5)
			},
			'&:active': {
				backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
			}
		}
	}
}));

import { ReactComponent as UserInterface } from 'assets/user-interface.svg';
import { RoutesConfig } from 'config/Routes/routeConfig';
import useGetCurrentUser from 'modules/Root/Pages/Auth/queries/useGetCurrentUser';
import { USERNAME_FROM_EMAIL } from 'utils/regex';
import { Archive, Delete, EditNotifications, PauseCircle, PlayCircle } from '@mui/icons-material';
import Ping from 'modules/Dashboard/components/Ping';
import useGetMonitors from 'modules/Dashboard/queries/useGetMonitors';
import { secondsToMinutes } from 'date-fns';
import useTogglePauseMonitor from 'modules/Dashboard/mutations/useTogglePauseMonitor';
import { toast } from 'react-toastify';
import ConfirmDeleteMonitorDialog from 'modules/Dashboard/components/Monitors/ConfirmDeleteMonitor';
import useDeleteMonitor from 'modules/Dashboard/mutations/useDeleteMonitor';
import { HealthCheck } from 'utils/interfaces';

const Monitors: React.FC = () => {
	const { currentUser } = useGetCurrentUser();
	const { data: monitors, refetch: refetchMonitors } = useGetMonitors();

	const [deleteConfirmation, setDeleteConfirmation] = React.useState<string | undefined>();
	const { mutate: togglePauseMonitor } = useTogglePauseMonitor();
	const { mutate: deleteMonitor } = useDeleteMonitor();

	const handlePauseMonitor = (monitorId: string, enabled: boolean) => {
		togglePauseMonitor(monitorId, {
			onSuccess: () => toast.success(enabled ? 'Monitor paused' : 'Monitor enabled'),
			onError: () => toast.error('Something went wrong, please try again later'),
			onSettled: () => refetchMonitors()
		});
	};

	const handleConfirmDeleteMonitor = (monitorId: string) => {
		setDeleteConfirmation(monitorId);
	};

	const handleDeleteMonitor = () => {
		if (deleteConfirmation) {
			deleteMonitor(deleteConfirmation, {
				onSuccess: () => toast.success('Monitor deleted'),
				onError: () => toast.error('Something went wrong, please try again later'),
				onSettled: () => {
					setDeleteConfirmation(undefined);
					refetchMonitors();
				}
			});
		} else {
			toast.error('Something went wrong, please try again later');
		}
	};

	return (
		<>
			{monitors?.data.length ? (
				<Grid container alignContent={'center'} sx={{ justifyContent: 'center' }} gap={5}>
					<Grid
						item
						container
						xs={12}
						sx={{ justifyContent: { xs: 'center', sm: 'space-between' }, gap: { xs: 3, sm: 1 } }}
						alignContent={'center'}
						alignItems={'center'}
						flexWrap={'wrap'}
					>
						<Grid item xs={12} sx={{ display: { xs: 'flex' }, justifyContent: { xs: 'center' } }} sm={6}>
							<Typography variant="h1">Greetings, {USERNAME_FROM_EMAIL(currentUser?.attributes?.email ?? '')}</Typography>
						</Grid>
						<Grid item sx={{ display: { xs: 'flex' }, justifyContent: { xs: 'center' } }} sm={4} lg={4} xl={3}>
							<Button
								disabled={monitors?.data.length >= 5}
								component={RouterLink}
								to={RoutesConfig.new}
								variant="contained"
								size="medium"
							>
								Create monitor
							</Button>
						</Grid>
					</Grid>

					<Grid maxHeight={'50svh'} overflow={'auto'} container item xs={12} justifyContent={'center'}>
						<List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: '1rem', p: 0 }}>
							{monitors.data.map((monitor, index) => (
								<MonitorRow
									key={monitor.id}
									monitor={monitor}
									monitorsCount={monitors?.data?.length}
									index={index}
									onPause={handlePauseMonitor}
									onDelete={handleConfirmDeleteMonitor}
								/>
							))}
						</List>
					</Grid>
				</Grid>
			) : (
				<Grid sx={{ minHeight: { lg: '60vh' } }} p={1} container alignContent={'center'} justifyContent={'center'}>
					<Grid item xs={12} md={6} lg={5} xl={4} container gap={5} direction={'column'}>
						<Typography variant={'h1'}>Create your first monitor</Typography>
						<Typography variant="h3">
							We will keep an eye on your server
							<br />
							and call or message you when it
							<br />
							goes down.
						</Typography>

						<Button
							component={RouterLink}
							to={RoutesConfig.new}
							variant="contained"
							sx={{ textTransform: 'capitalize', maxWidth: '50%' }}
						>
							Create monitor
						</Button>
						<br />
					</Grid>
					<Grid item xs={12} md={6} lg={5} xl={4}>
						<UserInterface width={'100%'} height={'100%'} />
					</Grid>
				</Grid>
			)}

			<ConfirmDeleteMonitorDialog
				onClose={() => setDeleteConfirmation(undefined)}
				onDelete={handleDeleteMonitor}
				open={!!deleteConfirmation}
				monitorName={monitors?.data.find((monitor) => monitor.id === deleteConfirmation)?.name ?? ''}
			/>
		</>
	);
};
export default Monitors;

interface MonitorRowProps {
	monitor: HealthCheck;
	index: number;
	monitorsCount?: number;
	onDelete: (monitorId: string) => void;
	onPause: (monitorId: string, enabled: boolean) => void;
}
const MonitorRow: React.FC<MonitorRowProps> = ({ monitor, index, onDelete, onPause, monitorsCount = 0 }) => {
	const theme = useTheme();
	const navigate = useNavigate();

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		setAnchorEl(event.target as any);
	};
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const handleClose = (_event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(null);
	};
	return (
		<React.Fragment key={monitor.id}>
			<ListItemButton
				key={monitor.id}
				component={RouterLink}
				to={`${monitor.id}`}
				sx={{
					borderTopRightRadius: index === 0 ? '1rem' : 0,
					borderTopLeftRadius: index === 0 ? '1rem' : 0,
					borderBottomRightRadius: index === monitorsCount - 1 ? '1rem' : 0,
					borderBottomLeftRadius: index === monitorsCount - 1 ? '1rem' : 0
				}}
			>
				<ListItemIcon>
					<Ping
						customcolor={
							typeof monitor.insights?.status === 'number' && monitor.enabled
								? monitor.insights?.status === 1
									? theme.palette.success.main
									: theme.palette.error.main
								: theme.palette.warning.main
						}
					/>
				</ListItemIcon>
				<ListItemText
					primary={
						<>
							{monitor.name}
							<Typography variant="subtitle2">
								{monitor.enabled
									? typeof monitor?.insights?.status === 'number'
										? monitor.insights?.status === 1
											? 'Up'
											: 'Down'
										: 'Pending'
									: 'Paused'}
							</Typography>
						</>
					}
				/>

				<ListItemIcon
					sx={{
						gap: 2,
						flexBasis: '14%',
						display: {
							xs: 'none',
							md: 'flex'
						},
						color: 'secondary.main',
						textTransform: 'lowercase'
					}}
				>
					<NetworkPingIcon />
					<Typography variant="subtitle2">{secondsToMinutes(monitor.interval ?? 0)} m</Typography>
				</ListItemIcon>
				<ListItemIcon>
					<Button
						variant="text"
						color="secondary"
						onClick={(e) => {
							// e.stopPropagation();
							e.preventDefault();
							handleClick(e);
						}}
					>
						<MoreHorizIcon />
					</Button>
				</ListItemIcon>
			</ListItemButton>

			<StyledMenu
				id="demo-customized-menu"
				MenuListProps={{
					'aria-labelledby': 'demo-customized-button'
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				<MenuItem
					onClick={(e) => {
						handleClose(e);
						navigate(`${monitor.id}/edit`);
					}}
					disableRipple
				>
					<EditNotifications />
					Configure
				</MenuItem>
				<Divider sx={{ my: 0.5 }} />
				<MenuItem
					onClick={(e) => {
						handleClose(e);
						onPause(monitor.id, monitor.enabled);
					}}
					disableRipple
				>
					{monitor.enabled ? <PauseCircle /> : <PlayCircle />}
					{monitor.enabled ? 'Pause' : 'Enable'} Monitor
				</MenuItem>

				{/* FIXME: Handle menu actions */}

				<MenuItem onClick={handleClose} disabled disableRipple>
					<Archive />
					Send test alert
				</MenuItem>
				<Divider sx={{ my: 0.5 }} />

				<MenuItem
					sx={{ color: theme.palette.error.main }}
					onClick={(e) => {
						handleClose(e);
						onDelete(monitor.id);
					}}
					disableRipple
				>
					<Delete sx={{ fill: theme.palette.error.main }} />
					Delete
				</MenuItem>
			</StyledMenu>
			{index !== monitorsCount - 1 && <Divider />}
		</React.Fragment>
	);
};
