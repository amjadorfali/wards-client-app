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
	.map((id) => [`#${id}`, { y: [40, 0], opacity: 1 }, { duration: 0.5, delay: staggerAnimation, at: '-0.2' }]);

const CodeSection: React.FC = () => {
	const theme = useTheme();
	const [scope, animate] = useAnimate<HTMLDivElement>();
	const inView = useInView(scope, { once: true, margin: '0px 0px -22% 0px' });

	useEffect(() => {
		if (inView) {
			animate([...animationSequence], {});
			animate(`#${elements.codeBlock}`, { y: [40, 0], opacity: 1 }, { duration: 0.5 });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inView]);

	return (
		<Grid container justifyContent={'center'} gap={10} alignContent={'flex-end'} pt={20} ref={scope}>
			<Grid item xs={11} sm={5} lg={3} container gap={3} alignContent={'flex-end'}>
				<Typography sx={{ opacity: 0 }} id={elements.title} variant="h2">
					{content.title.map((text) =>
						typeof text === 'string' ? (
							<React.Fragment key={text}>{text}</React.Fragment>
						) : (
							<Typography key={text.special} sx={{ ...theme.typography.h2 }} display={'inline'} color={'primary.light'}>
								{' '}
								{text.special}
							</Typography>
						)
					)}
				</Typography>
				<Typography sx={{ opacity: 0 }} id={elements.subtitle}>
					{content.subtitle}
				</Typography>

				<Grid sx={{ opacity: 0 }} item xs={11} id={elements.bashBlock} md={12}>
					<DemoBashBlock />
				</Grid>
			</Grid>
			<Grid sx={{ opacity: 0 }} item xs={11} id={elements.codeBlock} sm={5} lg={3}>
				<DemoCodeBlock />
			</Grid>
		</Grid>
	);
};

export default CodeSection;
