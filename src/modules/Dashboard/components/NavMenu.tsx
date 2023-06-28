import * as React from 'react';
import {
	AppBar,
	Box,
	Divider,
	Drawer,
	IconButton,
	ListItem,
	List,
	Toolbar,
	Typography,
	Menu,
	Tooltip,
	Button,
	Avatar,
	MenuItem,
	ListItemIcon,
	ListItemButton,
	ListItemText,
	SvgIconTypeMap
} from '@mui/material';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
	Settings as SettingsIcon,
	Language as WorldIcon,
	Menu as MenuIcon,
	KeyboardArrowDown as KeyboardArrowDownIcon,
	Logout as LogoutIcon,
	CreditCard as CreditCardIcon,
	HelpOutline as HelpOutlineIcon,
	Troubleshoot as TroubleshootIcon,
	People as PeopleIcon
} from '@mui/icons-material';

import useSignOut from 'modules/Root/Pages/Auth/mutations/useSignOut';
import { RoutesConfig } from 'config/Routes/routeConfig';
import useGetCurrentUserInfo from 'modules/Root/Pages/Auth/queries/useGetCurrentUserInfo';
import { OverridableComponent } from '@mui/material/OverridableComponent';

const drawerWidth = 240;

interface PageLinkConfig {
	title: string;
	url: RoutesConfig;
	// eslint-disable-next-line @typescript-eslint/ban-types
	Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
		muiName: string;
	};
}
const featurePages: PageLinkConfig[] = [
	{
		title: 'Monitors',
		url: RoutesConfig.monitors,
		Icon: WorldIcon
	},
	{
		title: 'Heartbeats',
		url: RoutesConfig.heartbeats,
		Icon: TroubleshootIcon
	}
];
const managementPages: PageLinkConfig[] = [
	{
		title: 'Billing',
		url: RoutesConfig.billing,
		Icon: CreditCardIcon
	},
	{
		title: 'Help',
		url: RoutesConfig.help,
		Icon: HelpOutlineIcon
	},
	{
		title: 'Manage Teams',
		url: RoutesConfig.teams,
		Icon: PeopleIcon
	}
];
const NavMenu: React.FC<React.PropsWithChildren> = ({ children }) => {
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	return (
		<Box sx={{ display: 'flex', height: '100%' }}>
			<AppBar
				position="fixed"
				sx={{
					width: { md: `calc(100% - ${drawerWidth}px)` },
					ml: { md: `${drawerWidth}px` },
					boxShadow: 'unset'
				}}
			>
				<Toolbar sx={{ backgroundColor: 'background.default' }}>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { md: 'none' } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography width={'100%'} variant="h6" noWrap component="div">
						Remote Ops
					</Typography>

					<AccountMenu />
				</Toolbar>
			</AppBar>
			<Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }} aria-label="mailbox folders">
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true // Better open performance on mobile.
					}}
					sx={{
						display: { xs: 'block', md: 'none' },
						'&.MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
					}}
				>
					{drawer(handleDrawerToggle)}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: 'none', md: 'block' },
						'&.MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
					}}
					open
				>
					{drawer()}
				</Drawer>
			</Box>
			<Box component="main" sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` }, height: '100%' }}>
				<Toolbar />
				{children}
			</Box>
		</Box>
	);
};
export default NavMenu;
const drawer = (handleDrawerToggle?: () => void) => (
	<>
		<Toolbar />
		<Divider />
		<List sx={{ height: '100%' }}>
			{featurePages.map(({ title, url, Icon }) => (
				<ListItem key={url} disablePadding>
					<ListItemButton onClick={handleDrawerToggle} component={RouterLink} to={url}>
						<ListItemIcon>
							<Icon />
						</ListItemIcon>
						<ListItemText primary={title} />
					</ListItemButton>
				</ListItem>
			))}
		</List>
		<Divider />
		<List>
			{managementPages.map(({ title, url, Icon }) => (
				<ListItem key={url} disablePadding>
					<ListItemButton onClick={handleDrawerToggle} component={RouterLink} to={url}>
						<ListItemIcon>
							<Icon />
						</ListItemIcon>
						<ListItemText primary={title} />
					</ListItemButton>
				</ListItem>
			))}
		</List>
	</>
);

const AccountMenu: React.FC = () => {
	const signOut = useSignOut();
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const currentUser = useGetCurrentUserInfo();

	const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);
	const handleSignOut = () => {
		handleClose();
		signOut.mutate(undefined, {
			onSuccess: () => navigate(`/${RoutesConfig.signIn}`)
		});
	};
	return (
		<React.Fragment>
			<Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
				<Tooltip title="Account settings">
					<Button
						aria-controls={open ? 'account-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}
						variant="text"
						color="inherit"
						sx={{ borderRadius: '10px' }}
						disableElevation
						onClick={handleClick}
						endIcon={<KeyboardArrowDownIcon />}
						startIcon={
							<Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>{currentUser.data?.attributes.email.charAt(0)}</Avatar>
						}
					>
						{currentUser.data?.attributes.email
							.split('@')[0]
							.split(/^([^@]+?)[^a-zA-Z0-9_\-+~!]+/)
							.join(' ')}
					</Button>
				</Tooltip>
			</Box>
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: 'visible',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						bgcolor: 'background.default',
						mt: 1.5,

						'&.MuiPaper-root': {
							minWidth: 200
						},
						'&:before': {
							content: '""',
							display: 'block',
							position: 'absolute',
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: 'background.paper',
							transform: 'translateY(-50%) rotate(45deg)',
							zIndex: 0
						}
					}
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<MenuItem onClick={handleClose} component={RouterLink} to={RoutesConfig.settings}>
					<ListItemIcon>
						<SettingsIcon fontSize="small" />
					</ListItemIcon>
					Settings
				</MenuItem>
				<MenuItem onClick={handleSignOut}>
					<ListItemIcon>
						<LogoutIcon fontSize="small" />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</React.Fragment>
	);
};
