import React, { Suspense, useEffect } from 'react';
import { Button, Grid, Paper, Typography, useTheme } from '@mui/material';
const InfiniteTime = React.lazy(() => import('components/charts/InfiniteTime'));
import { useAnimate, stagger } from 'framer-motion';

const staggerAnimation = stagger(0.25);

const ids = {
	//FIXME: not animating header for now, as it's affecting lighthouse LCP score
	// header: 'header',
	subtitle: 'subtitle',
	actionButtons: 'actionButtons',
	graph: 'graph'
};

const HeroSection: React.FC = () => {
	const theme = useTheme();
	const [scope, animate] = useAnimate<HTMLDivElement>();

	useEffect(() => {
		animate(
			[
				...Object.keys(ids).map((id) => [
					`#${id}`,
					{ scale: [0, 1], opacity: 1, ease: 'easeOut' },
					{ duration: 0.8, delay: ids.subtitle === id ? 0.5 : staggerAnimation, at: '-0.4' }
				])
			],
			{}
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<Grid
			container
			sx={{
				minHeight: '80vh',
				background: theme.palette.customBg.gradient,
				position: 'relative',
				//Responsive layout
				pt: { xs: 15, md: 10 },

				alignContent: { md: 'center' }
			}}
			gap={15}
			ref={scope}
		>
			<Grid container item xs={12} justifyContent={'center'} height={'fit-content'} gap={3}>
				<Grid item xs={12}>
					<Typography variant="h1" color={'text.secondary'} align="center">
						Analytics for <br />
						<Typography variant="body1" sx={{ ...theme.typography.h1 }} display={'inline'} color="primary.main">
							Developers
						</Typography>
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography sx={{ opacity: 0 }} id={ids.subtitle} variant="subtitle1" align="center">
						Easy to install. Unlimited power.
					</Typography>
				</Grid>
				<Grid item xs={12} container justifyContent={'center'}>
					<Button
						sx={{ opacity: 0, textTransform: 'capitalize' }}
						id={ids.actionButtons}
						variant="contained"
						color="primary"
						size="large"
					>
						Get Started
					</Button>
				</Grid>
			</Grid>

			<Grid container item xs={12} justifyContent={'center'}>
				<Grid
					component={Paper}
					elevation={10}
					item
					xs={12}
					md={7}
					sx={{ px: 2, mb: -7, background: theme.palette.customBg.primary, minHeight: '35rem', opacity: 0 }}
					id={ids.graph}
				>
					<Suspense fallback={<>Hey there, still loading...</>}>
						<InfiniteTime ReactChartsComponentProps={{ style: { height: '35rem' } }} />
					</Suspense>
				</Grid>
			</Grid>
		</Grid>
	);
};
export default HeroSection;
