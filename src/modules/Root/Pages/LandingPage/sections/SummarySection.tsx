import React, { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';

import { useAnimate, useInView } from 'framer-motion';

const content = {
	title: ['Maximize Application Performance', 'with Enhanced Monitoring'],
	subtitle: ['Gain full visibility and ensure peak', 'efficiency with our comprehensive Monitoring service.']
};
const SummarySection: React.FC = () => {
	const [scope, animate] = useAnimate<HTMLDivElement>();
	const isInView = useInView(scope, { once: true, margin: '0px 0px -22% 0px' });

	useEffect(() => {
		if (isInView) {
			animate(scope.current, { y: [40, 0], opacity: 1 }, { duration: 0.5, delay: 0.3 });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isInView]);

	return (
		<>
			<Grid py={20} bgcolor={'background.paper'} container justifyContent={'center'} alignContent={'center'}>
				<Grid sx={{ opacity: 0 }} ref={scope} item xs={12} md={12} textAlign={'center'}>
					<Typography variant="h2">
						{content.title.map((text) => (
							<React.Fragment key={text}>
								{text}
								<br />
							</React.Fragment>
						))}
					</Typography>
					<Typography color="text.secondary" px={3} pt={3}>
						{content.subtitle.map((text) => (
							<React.Fragment key={text}>
								{text}
								<br />
							</React.Fragment>
						))}
					</Typography>
				</Grid>
				<Grid container item xs={10} md={8} justifyContent={'center'}></Grid>
			</Grid>
		</>
	);
};

export default SummarySection;
