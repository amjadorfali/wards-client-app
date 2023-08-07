// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import { Button, Divider, Grid, ListItemButton, Menu, MenuItem, MenuProps, Typography, alpha, styled, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
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
import { Archive, Delete, EditNotifications, FileCopy } from '@mui/icons-material';
import Ping from 'modules/Dashboard/components/Ping';
import useGetMonitors from 'modules/Dashboard/queries/useGetMonitors';
const Monitors: React.FC = () => {
	const theme = useTheme();
	const { currentTeam } = useGetCurrentUser();
	const { data: monitors } = useGetMonitors(currentTeam?.uuid || '');
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = (e: React.MouseEvent<HTMLElement>) => {
		e?.preventDefault();
		e?.stopPropagation();
		setAnchorEl(null);
	};
	const { currentUser } = useGetCurrentUser();

	//FIXME: This is still a demo, needs fixing for the logic/real data
	return (
		<>
			{
				// FIXME: This is temp code as a demo
				monitors?.data.data.length ? (
					<Grid container minHeight={'40svh'} alignContent={'center'} sx={{ justifyContent: 'center' }} gap={5}>
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
								<Button component={RouterLink} to={RoutesConfig.new} variant="contained" size="medium">
									Create monitor
								</Button>
							</Grid>
						</Grid>

						<Grid container item xs={12} justifyContent={'center'}>
							<List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: '1rem', p: 0 }}>
								{monitors.data.data.map((item, index) => (
									<React.Fragment key={item}>
										<ListItemButton
											key={item}
											component={RouterLink}
											to={`${item}`}
											onClick={() => {
												console.log('clicked');
											}}
											sx={{
												borderRadius: index === 0 ? '1rem 1rem 0 0' : index === 1 ? '0 0 1rem 1rem' : 0
											}}
										>
											<ListItemIcon>
												<Ping isSuccess={index % 2} />
											</ListItemIcon>
											<ListItemText
												primary={
													<>
														{item.name}
														<Typography variant="subtitle2"> {index % 2 ? 'Up' : 'Down'}. 1h</Typography>
													</>
												}
											/>

											<ListItemIcon>
												<Button
													variant="text"
													color="secondary"
													onClick={(e) => {
														e.stopPropagation();
														e.preventDefault();
													}}
													sx={{ gap: 1, textTransform: 'capitalize' }}
													//TODO: Route to edit
												>
													<NetworkPingIcon />
													<Typography variant="subtitle2">{item.interval}S</Typography>
												</Button>
											</ListItemIcon>
											<ListItemIcon>
												<Button
													variant="text"
													color="secondary"
													onClick={(e) => {
														e.stopPropagation();
														e.stopPropagation();
														e.preventDefault();
														handleClick(e);
													}}
												>
													<MoreHorizIcon />
												</Button>
											</ListItemIcon>

											<StyledMenu
												id="demo-customized-menu"
												MenuListProps={{
													'aria-labelledby': 'demo-customized-button'
												}}
												anchorEl={anchorEl}
												open={open}
												onClose={handleClose}
											>
												<MenuItem onClick={handleClose} disableRipple>
													<EditNotifications />
													Configure
												</MenuItem>
												<Divider sx={{ my: 0.5 }} />
												<MenuItem onClick={handleClose} disableRipple>
													<FileCopy />
													Pause
												</MenuItem>
												<MenuItem onClick={handleClose} disableRipple>
													<Archive />
													Send test alert
												</MenuItem>
												<Divider sx={{ my: 0.5 }} />

												<MenuItem sx={{ color: theme.palette.error.main }} onClick={handleClose} disableRipple>
													<Delete sx={{ fill: theme.palette.error.main }} />
													Delete
												</MenuItem>
											</StyledMenu>
										</ListItemButton>
										{index !== 1 && <Divider />}
									</React.Fragment>
								))}
							</List>
						</Grid>
					</Grid>
				) : (
					<Grid minHeight={'60svh'} p={1} container alignContent={'center'} justifyContent={'center'}>
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
				)
			}
		</>
	);
};
export default Monitors;
