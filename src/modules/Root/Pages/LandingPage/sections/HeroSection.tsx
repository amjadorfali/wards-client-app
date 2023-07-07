import React, { useEffect } from 'react';
import { Button, Grid, Typography, useTheme } from '@mui/material';
import { useAnimate, stagger } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { RoutesConfig } from 'config/Routes/routeConfig';
import { ReactComponent as GraphMonitorIcon } from 'assets/graph-monitor.svg';
const staggerAnimation = stagger(0.25);

const ids = {
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
				position: 'relative',
				minHeight: '100svh',
				pt: 10,
				//Responsive layout
				gap: { xs: 5, md: 10, lg: 15 }
			}}
			ref={scope}
			alignContent={'center'}
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

			<Grid sx={{ px: 2, opacity: 0 }} container item xs={12} justifyContent={'center'} id={ids.graph}>
				<Grid item xs={12} sm={9} md={7} lg={5} xl={3}>
					<GraphMonitorIcon width={'100%'} height={'100%'} />
				</Grid>
			</Grid>
		</Grid>
	);
};
export default HeroSection;
