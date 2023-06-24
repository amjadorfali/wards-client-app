import React, { Suspense, useEffect } from 'react';
import { Button, Grid, Paper, Typography, useTheme } from '@mui/material';
const InfiniteTime = React.lazy(() => import('components/charts/InfiniteTime'));
import { useAnimate, stagger } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { RoutesConfig } from 'config/Routes/routeConfig';

const staggerAnimation = stagger(0.25);

const ids = {
	//FIXME: not animating header for now, as it's affecting lighthouse LCP score
	// header: 'header',
	subtitle: 'subtitle',
	actionButtons: 'actionButtons',
	graph: 'graph'
};

const content = {
	title: ['Simply', { special: 'Monitoring' }],
	subtitle: 'Stay ahead of potential issues with our advanced Monitoring solution.',
	callToAction: { text: 'Start Monitoring Now', link: RoutesConfig.signUp }
};

const HeroSection: React.FC = () => {
	const theme = useTheme();
	const [scope, animate] = useAnimate<HTMLDivElement>();

	useEffect(() => {
		animate(
			[
				...Object.keys(ids).map((id) => [
					`#${id}`,
					{ y: [40, 0], opacity: 1, ease: 'easeInOut' },
					{ duration: 0.8, delay: ids.subtitle === id ? 0.7 : staggerAnimation, at: '-0.4' }
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
				minHeight: '90%',
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
					<Typography variant="h1" align="center">
						{content.title.map((text) =>
							typeof text === 'string' ? (
								<React.Fragment key={text}> {text}</React.Fragment>
							) : (
								<React.Fragment key={text.special}>
									<br />
									<Typography variant="body1" sx={{ ...theme.typography.h1 }} display={'inline'} color="primary">
										{text.special}
									</Typography>
								</React.Fragment>
							)
						)}
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<Typography id={ids.subtitle} sx={{ opacity: 0 }} align="center">
						{content.subtitle}
					</Typography>
				</Grid>
				<Grid item xs={12} container justifyContent={'center'}>
					<Button
						sx={{ opacity: 0, textTransform: 'capitalize' }}
						id={ids.actionButtons}
						variant="contained"
						color="primary"
						size="large"
						component={RouterLink}
						to={content.callToAction.link}
					>
						{content.callToAction.text}
					</Button>
				</Grid>
			</Grid>

			<Grid sx={{ pt: 25 }} container item xs={12} justifyContent={'center'}>
				<Grid
					component={Paper}
					elevation={10}
					item
					xs={12}
					md={7}
					sx={{ px: 2, opacity: 0, minHeight: '35rem', mb: -5 }}
					id={ids.graph}
				>
					<Suspense>
						<InfiniteTime ReactChartsComponentProps={{ style: { height: '35rem' } }} />
					</Suspense>
				</Grid>
			</Grid>
		</Grid>
	);
};
export default HeroSection;
