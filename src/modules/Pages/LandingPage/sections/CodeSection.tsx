import React, { useEffect } from 'react';

import DemoCodeBlock from 'components/docs/DemoCodeBlock';
import DemoBashBlock from 'components/docs/DemoBashBlock';
import { Grid, Typography, useTheme } from '@mui/material';
import { stagger, useAnimate, useInView } from 'framer-motion';

const elements = {
	title: 'title',
	subtitle: 'subtitle',
	codeBlock: 'codeBlock',
	bashBlock: 'bashBlock'
};

const content = {
	title: ['Seamless Integration with', { special: 'Our Robust SDKs' }],
	subtitle: 'Effortlessly incorporate our service into your applications.'
};
const staggerAnimation = stagger(0.3);

const animationSequence = Object.keys(elements)
	.filter((id) => id != elements.codeBlock)
	.map((id) => [`#${id}`, { opacity: 1, scale: [0.5, 1] }, { duration: 0.5, delay: staggerAnimation, at: '-0.2' }]);

const CodeSection: React.FC = () => {
	const theme = useTheme();
	const [scope, animate] = useAnimate<HTMLDivElement>();
	const inView = useInView(scope, { once: true, margin: '0px 0px -30% 0px' });

	useEffect(() => {
		if (inView) {
			animate([...animationSequence], {});
			animate(`#${elements.codeBlock}`, { opacity: 1, scale: [0.5, 1] }, { duration: 0.5 });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inView]);

	return (
		<Grid
			container
			justifyContent={'center'}
			gap={10}
			alignContent={'flex-end'}
			pt={20}
			sx={{
				background: theme.palette.customBg.tertiaryGradient
			}}
			ref={scope}
		>
			<Grid item xs={11} sm={5} lg={3} container sx={{}} gap={3}>
				<Typography sx={{ opacity: 0 }} id={elements.title} variant="h2" color={'text.secondary'}>
					{content.title.map((text) =>
						typeof text === 'string' ? (
							<React.Fragment key={text}>{text}</React.Fragment>
						) : (
							<Typography key={text.special} variant="body1" sx={{ ...theme.typography.h2 }} display={'inline'} color={'tertiary'}>
								{' '}
								{text.special}
							</Typography>
						)
					)}
				</Typography>
				<Typography sx={{ opacity: 0 }} id={elements.subtitle} variant="subtitle1">
					{content.subtitle}
				</Typography>

				<Grid item xs={11} sx={{ opacity: 0 }} id={elements.bashBlock} md={12}>
					<DemoBashBlock />
				</Grid>
			</Grid>
			<Grid item xs={11} sx={{ opacity: 0 }} id={elements.codeBlock} sm={5} lg={3}>
				<DemoCodeBlock />
			</Grid>
		</Grid>
	);
};

export default CodeSection;
