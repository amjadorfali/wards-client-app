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
import { Link as RouterLink } from 'react-router-dom';
import { Menu as MenuIcon } from '@mui/icons-material';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import SavingsIcon from '@mui/icons-material/Savings';
import InfoIcon from '@mui/icons-material/Info';
import BookIcon from '@mui/icons-material/Book';

import { RoutesConfig } from 'modules/App/App';

const pages = ['Products', 'Pricing', 'Docs', 'About'];
const icons = [MonitorHeartIcon, SavingsIcon, BookIcon, InfoIcon];
const actions = ['Sign In', 'Sign Up'];

const Navbar: React.FC = () => {
	const theme = useTheme();

	const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);

	const handleOpenNavMenu = () => {
		setDrawerOpen(true);
	};

	const handleCloseNavMenu = () => {
		setDrawerOpen(false);
	};

	/* From https://css.glass */
	return (
		<AppBar
			position="fixed"
			sx={{
				bgcolor: theme.palette.customBg.primary,
				background: theme.palette.customBg.header,
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
							letterSpacing: '.3rem'
						}}
					>
						Ops
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
									width: '100%',
									bgcolor: theme.palette.customBg.primary,
									background: theme.palette.customBg.header,
									backdropFilter: 'blur(5.2px)'
								}
							}}
							anchor={'left'}
							open={drawerOpen}
							onClose={handleCloseNavMenu}
						>
							<List>
								{pages.map((text, index) => {
									const Icon = icons[index];
									return (
										<ListItem key={text}>
											<ListItemButton component={RouterLink} to={RoutesConfig.dummy} onClick={handleCloseNavMenu}>
												<ListItemIcon children={<Icon />} sx={{ color: theme.palette.primary.main }} />
												<ListItemText sx={{ color: theme.palette.secondary.main }} primary={text} />
											</ListItemButton>
										</ListItem>
									);
								})}
							</List>

							<Grid container wrap="wrap" direction={'column'} p={2} gap={2}>
								<Button
									component={RouterLink}
									to={RoutesConfig.dummy}
									onClick={handleCloseNavMenu}
									size="large"
									color="primary"
									variant="outlined"
								>
									Sign In
								</Button>
								<Button
									component={RouterLink}
									to={RoutesConfig.dummy}
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
							letterSpacing: '.3rem'
						}}
					>
						Ops
					</Link>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} justifyContent={'center'}>
						{pages.map((page) => (
							<Button component={RouterLink} to={RoutesConfig.dummy} key={page} sx={{ my: 2, color: 'white', display: 'block' }}>
								{page}
							</Button>
						))}
					</Box>

					<Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }} gap={2} justifyContent={'flex-end'}>
						{actions.map((action) => (
							<Button
								component={RouterLink}
								to={RoutesConfig.dummy}
								variant="outlined"
								color="secondary"
								key={action}
								sx={{ my: 2, color: 'white', display: 'block' }}
							>
								{action}
							</Button>
						))}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default Navbar;
