import * as React from 'react';
import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Container,
	Button,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	useTheme,
	Grid,
	Link
} from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { AttachMoney, EmailOutlined, Menu as MenuIcon } from '@mui/icons-material';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import { RoutesConfig } from 'config/Routes/routeConfig';

/** Used to set ids to scroll to */
export enum ScrollTo {
	FEATURES = 'features',
	PLANS = 'plans',
	CONTACT = 'contact'
}
const pages = [
	{
		Icon: MonitorHeartIcon,
		title: 'Features',
		key: ScrollTo.FEATURES
	},
	{
		Icon: AttachMoney,
		title: 'Plans',
		key: ScrollTo.PLANS
	},
	{
		Icon: MonitorHeartIcon,
		title: 'Try now',
		key: ScrollTo.PLANS
	},
	{
		Icon: EmailOutlined,
		title: 'Contact',
		key: ScrollTo.CONTACT
	}
];

const actions = [
	{ text: 'Sign In', link: RoutesConfig.dashboard },
	{ text: 'Sign Up', link: RoutesConfig.dashboard }
];

const Navbar: React.FC = () => {
	const theme = useTheme();
	const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);
	const { pathname, state } = useLocation() as { pathname: string; state: { scrollTo?: ScrollTo } };
	const navigate = useNavigate();

	const handleOpenNavMenu = () => {
		setDrawerOpen(true);
	};

	const handleCloseNavMenu = () => {
		setDrawerOpen(false);
	};

	React.useEffect(() => {
		let timeout: NodeJS.Timeout;
		if (state?.scrollTo) {
			const element = document?.getElementById(state?.scrollTo);
			timeout = setTimeout(() => element?.scrollIntoView({ behavior: 'smooth' }), 500);
		}

		return () => clearTimeout(timeout);
	}, [state?.scrollTo]);

	const handleScrollToPage = (key: ScrollTo, isMobile?: boolean) => {
		const element = document?.getElementById(key);
		if (pathname !== RoutesConfig.home) return navigate(RoutesConfig.home, { state: { scrollTo: key } });

		element?.scrollIntoView({ behavior: isMobile ? 'instant' : 'smooth' });
	};

	/* From https://css.glass */
	return (
		<AppBar
			position="fixed"
			sx={{
				background: theme.palette.background.paper,
				backdropFilter: 'blur(5.2px)'
			}}
		>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<MonitorHeartIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
					<Link
						to="/"
						underline="none"
						component={RouterLink}
						noWrap
						sx={{
							...theme.typography.h6,
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: theme.palette.primary.light
						}}
					>
						Wards
					</Link>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>

						<Drawer
							sx={{
								'.MuiDrawer-paper': {
									width: '80%',
									backdropFilter: 'blur(5.2px)'
								}
							}}
							anchor={'left'}
							open={drawerOpen}
							onClose={handleCloseNavMenu}
						>
							<List>
								{pages.map(({ Icon, title, key }) => (
									<ListItem key={title}>
										<ListItemButton
											onClick={() => {
												handleCloseNavMenu();
												handleScrollToPage(key, true);
											}}
										>
											<ListItemIcon children={<Icon />} sx={{ color: theme.palette.primary.main }} />
											<ListItemText primary={title} />
										</ListItemButton>
									</ListItem>
								))}
							</List>

							<Grid container wrap="wrap" direction={'column'} p={2} gap={2}>
								<Button
									component={RouterLink}
									to={RoutesConfig.dashboard}
									onClick={handleCloseNavMenu}
									size="large"
									color="primary"
									variant="outlined"
								>
									Sign In
								</Button>
								<Button
									component={RouterLink}
									to={RoutesConfig.dashboard}
									onClick={handleCloseNavMenu}
									size="large"
									color="primary"
									variant="contained"
								>
									Sign Up
								</Button>
							</Grid>
						</Drawer>
					</Box>
					<MonitorHeartIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

					<Link
						to="/"
						underline="none"
						component={RouterLink}
						noWrap
						sx={{
							...theme.typography.h5,
							mr: 2,
							flexGrow: 1,
							display: { xs: 'flex', md: 'none' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: theme.palette.secondary.light
						}}
					>
						Wards
					</Link>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} justifyContent={'center'}>
						{pages.map(({ title, key }) => (
							<Button key={title} onClick={() => handleScrollToPage(key)} sx={{ my: 2, color: 'white', display: 'block' }}>
								{title}
							</Button>
						))}
					</Box>

					<Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }} gap={2} justifyContent={'flex-end'}>
						{actions.map(({ link, text }, index) => (
							<Button
								component={RouterLink}
								to={link}
								variant={index !== 0 ? 'contained' : 'outlined'}
								color="primary"
								key={link}
								sx={{ my: 2, color: 'white', display: 'block' }}
							>
								{text}
							</Button>
						))}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default Navbar;
