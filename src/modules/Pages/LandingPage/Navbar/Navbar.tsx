import * as React from 'react';
import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Typography,
	Container,
	Button,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	useTheme,
	Grid
} from '@mui/material';
import { Menu as MenuIcon, Adb as AdbIcon } from '@mui/icons-material';

const pages = ['Products', 'Pricing', 'Docs', 'About'];
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

	return (
		<AppBar position="fixed" sx={{ backdropFilter: 'blur(5px)', bgcolor: theme.palette.customBg.primary }}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none'
						}}
					>
						LOGO
					</Typography>

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
							sx={{ '.MuiDrawer-paper': { width: '100%', bgcolor: theme.palette.customBg.primary } }}
							anchor={'left'}
							open={drawerOpen}
							onClose={handleCloseNavMenu}
						>
							<List>
								{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
									<ListItem key={text}>
										<ListItemButton onClick={handleCloseNavMenu}>
											<ListItemIcon sx={{ color: theme.palette.primary.main }}>
												{index % 2 === 0 ? <AdbIcon /> : <AdbIcon />}
											</ListItemIcon>
											<ListItemText sx={{ color: theme.palette.secondary.main }} primary={text} />
										</ListItemButton>
									</ListItem>
								))}
							</List>

							<Grid container wrap="wrap" direction={'column'} p={2} gap={2}>
								<Button onClick={handleCloseNavMenu} size="large" color="primary" variant="outlined">
									Sign In
								</Button>
								<Button onClick={handleCloseNavMenu} size="large" color="primary" variant="contained">
									Sign Up
								</Button>
							</Grid>
						</Drawer>
					</Box>
					<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
					<Typography
						variant="h5"
						noWrap
						component="a"
						href=""
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none'
						}}
					>
						LOGO
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} justifyContent={'center'}>
						{pages.map((page) => (
							<Button key={page} sx={{ my: 2, color: 'white', display: 'block' }}>
								{page}
							</Button>
						))}
					</Box>

					<Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }} gap={2} justifyContent={'flex-end'}>
						{actions.map((action) => (
							<Button variant="outlined" color="secondary" key={action} sx={{ my: 2, color: 'white', display: 'block' }}>
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
