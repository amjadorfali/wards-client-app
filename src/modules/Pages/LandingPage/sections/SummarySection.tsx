import React, { useEffect } from 'react';
//TODO: Work on a cool animations for this section
// import { ReactComponent as StreamingIcon } from 'assets/streaming.svg';
import { Grid, Typography } from '@mui/material';
import { useMaintainScroll } from 'hooks';

import { useAnimate, useInView } from 'framer-motion';

const SummarySection: React.FC = () => {
	const [scope, animate] = useAnimate<HTMLDivElement>();
	const isInView = useInView(scope, { once: true, margin: '0px 0px -35% 0px' });

	//This is maintaining the scroll for all the landing page, not just this section
	//It needs to be called here for now due to Lazy Loading sections
	useMaintainScroll();
	useEffect(() => {
		if (isInView) {
			animate(scope.current, { opacity: 1, scale: [0.5, 1], y: [100, 0] }, { duration: 0.5, delay: 0.3 });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isInView]);

	return (
		<>
			<Grid py={20} container justifyContent={'center'} alignContent={'center'}>
				<Grid sx={{ opacity: 0 }} ref={scope} item xs={12} md={12} textAlign={'center'}>
					<Typography variant="h2">
						Empower your team <br /> with good data
					</Typography>
					<Typography variant="subtitle1" px={3} pt={3}>
						We collect events from your web & mobile apps and provide <br /> a complete data toolkit for every team in your company.
					</Typography>
				</Grid>
				<Grid container item xs={10} md={8} justifyContent={'center'}>
					{/* <StreamingIcon height={'100%'} width={'100%'} /> */}
				</Grid>
			</Grid>
		</>
	);
};

export default SummarySection;
