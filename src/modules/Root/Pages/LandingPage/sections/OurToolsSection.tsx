import React, { useEffect, useRef } from 'react';
import { Box, Grid, Typography, styled, useTheme } from '@mui/material';
import { ReactComponent as OctaconIcon } from 'assets/octagon.svg';
import { ReactComponent as LotusIcon } from 'assets/lotus.svg';
import { stagger, useAnimate, useInView } from 'framer-motion';

const headingElements = {
	title: 'title',
	subtitle: 'subtitle'
};

const textElements = {
	text1: 'text1',
	text2: 'text2',
	text3: 'text3',
	text4: 'text4',
	text5: 'text5'
};

const content: {
	title: (string | { special: string })[];
	subtitle: string[];
	features: { [key in keyof typeof textElements]: string };
} = {
	title: ['Powered by', { special: 'Cutting-Edge' }, 'Technologies'],
	subtitle: ['Leveraging industry-leading tools', 'for superior monitoring capabilities.'],
	features: {
		text1: 'RemoteOps',
		text2: 'Regional Monitoring',
		text3: 'Robust & Seamless Operations',
		text4: 'Real-Time Monitoring with Speed and Precision',
		text5: 'Efficient Team Collaboration, Management, and Operations'
	}
};

const staggerAnimation = stagger(0.25);
const headingAnimationSequence = Object.keys(headingElements).map((id) => [
	`#${id}`,
	{ y: [40, 0], opacity: 1 },
	{ duration: 0.5, delay: staggerAnimation, at: '-0.2' }
]);

const textAnimationSequence = Object.keys(textElements).map((id) => [
	`#${id}`,
	{ y: [40, 0], opacity: 1 },
	{ duration: 0.5, delay: staggerAnimation, at: '-0.2' }
]);

const OurToolsSection: React.FC = () => {
	const [scope, animate] = useAnimate<HTMLDivElement>();
	const [headingRef, textRef] = [useRef(null), useRef(null)];
	const [headingInView, textInView] = [
		useInView(headingRef, { once: true, margin: '0px 0px -22% 0px' }),
		useInView(textRef, {
			once: true,
			margin: '0px 0px -22% 0px'
		})
	];

	useEffect(() => {
		if (headingInView) {
			animate([...headingAnimationSequence], {});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [headingInView]);

	useEffect(() => {
		if (textInView) {
			animate([...textAnimationSequence], {});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [textInView]);

	const theme = useTheme();
	return (
		<>
			<Grid pt={20} pb={5} container justifyContent={'center'} alignContent={'center'} ref={scope}>
				<Grid item container xs={12} justifyContent={'center'} gap={2}>
					{/* Heading */}
					<Grid item container ref={headingRef} gap={4}>
						<Grid item xs={12}>
							<Typography sx={{ opacity: 0 }} id={headingElements.title} variant="h2" textAlign={'center'}>
								{content.title.map((text) =>
									typeof text === 'string' ? (
										<React.Fragment key={text}>
											{text}
											<br />
										</React.Fragment>
									) : (
										<Typography
											key={text.special}
											variant="body1"
											display={'inline'}
											sx={{ ...theme.typography.h2 }}
											color={'primary'}
										>
											{text.special}{' '}
										</Typography>
									)
								)}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography sx={{ opacity: 0 }} id={headingElements.subtitle} textAlign={'center'}>
								{content.subtitle.map((text) => (
									<React.Fragment key={text}>
										{text}
										<br />
									</React.Fragment>
								))}
							</Typography>
						</Grid>
					</Grid>
					{/* Big icon */}

					<Grid item sx={{ position: 'relative', height: '15rem' }}>
						<ShadowBox />
						<StyledOctaconIcon />

						<LotusIconWrapper>
							<Box style={{ display: 'contents' }}>
								<LotusIcon height={'100%'} width={'100%'} />
							</Box>
						</LotusIconWrapper>

						<NumberWrapper>
							<NumberOutline>
								<SpanOne>
									<SpanTwo>
										<SpanThree>3</SpanThree>
										<br />
									</SpanTwo>
								</SpanOne>
							</NumberOutline>
						</NumberWrapper>
					</Grid>
					{/* Text */}
					<Grid item container ref={textRef} gap={2}>
						<Grid item xs={12}>
							<Typography sx={{ opacity: 0 }} color={'secondary.dark'} id={textElements.text1} fontWeight={600} textAlign={'center'}>
								{content.features.text1}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography sx={{ opacity: 0 }} color={'secondary.main'} id={textElements.text2} fontWeight={600} textAlign={'center'}>
								{content.features.text2}
							</Typography>
						</Grid>

						<Grid item xs={12}>
							<Typography sx={{ opacity: 0 }} color={'primary.light'} id={textElements.text3} fontWeight={600} textAlign={'center'}>
								{content.features.text3}
							</Typography>
						</Grid>

						<Grid item xs={12}>
							<Typography sx={{ opacity: 0 }} color={'primary.main'} id={textElements.text4} fontWeight={600} textAlign={'center'}>
								{content.features.text4}
							</Typography>
						</Grid>

						<Grid item xs={12}>
							<Typography sx={{ opacity: 0 }} color={'primary.dark'} id={textElements.text5} fontWeight={600} textAlign={'center'}>
								{content.features.text5}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

export default OurToolsSection;

const LotusIconWrapper = styled('div')`
	font-size: 12px;
	pointer-events: unset;
	position: absolute;
	width: 122px;
	height: auto;
	left: calc(49.6667% - 61px);
	top: calc(49.6667% - 61px);
	flex: 0 0 auto;
	aspect-ratio: 1 / 1;
	opacity: 0.9;
`;

const ShadowBox = styled(Box)`
	font-size: 12px;
	box-sizing: border-box;
	-webkit-font-smoothing: inherit;
	pointer-events: unset;
	position: absolute;
	overflow: visible;
	width: 151px;
	height: auto;
	left: calc(50% - 75.5px);
	top: calc(49.6667% - 75.5px);
	flex: 0 0 auto;
	aspect-ratio: 1 / 1;
	border-radius: 50%;
	box-shadow: rgba(238, 105, 158, 0.3) 0px 0px 200px 100px, rgba(120, 85, 255, 0.1) 0px 0px 300px 300px;
`;

const StyledOctaconIcon = styled(OctaconIcon)`
	font-size: 12px;
	box-sizing: border-box;
	-webkit-font-smoothing: inherit;
	pointer-events: unset;
	position: absolute;
	width: 300px;
	height: 300px;
	left: calc(50.00000000000002% - 300px / 2);
	flex: none;
	top: calc(50% - 150px);
	flex-shrink: 0;
`;

const NumberWrapper = styled('div')`
	font-size: 12px;
	box-sizing: border-box;
	-webkit-font-smoothing: inherit;
	pointer-events: unset;
	position: absolute;
	overflow: visible;
	width: 26px;
	height: auto;
	bottom: 70px;
	left: calc(49.6667% - 13px);
	flex: 0 0 auto;
	aspect-ratio: 1 / 1;
	border-radius: 50%;
	box-shadow: rgba(0, 0, 0, 0.4) 0px -8px 16px 0px;
	background: linear-gradient(141deg, rgb(234, 128, 255) 0%, rgb(226, 85, 141) 100%);
`;

const NumberOutline = styled('div')`
	box-sizing: border-box;

	-webkit-font-smoothing: inherit;
	cursor: inherit;
	pointer-events: unset;
	position: absolute;
	overflow: hidden;
	width: auto;
	height: 16px;
	left: 50%;
	top: 54%;
	flex: 0 0 auto;
	white-space: pre;
	--framer-font-family: 'DM Mono', monospace;
	--framer-font-style: normal;
	--framer-font-weight: 500;
	--framer-text-color: #ffffff;
	--framer-font-size: 16px;
	--framer-letter-spacing: -0.6px;
	--framer-text-transform: none;
	--framer-text-decoration: none;
	--framer-line-height: 1em;
	--framer-link-text-color: #0099ff;
	--framer-link-text-decoration: underline;
	outline: none;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	flex-shrink: 0;
	line-height: 1px;
	font-size: 0px;
	--framer-text-alignment: center;
	transform: translate(-50%, -50%);
`;

const SpanOne = styled('span')`
	cursor: inherit;
	--framer-font-family: 'DM Mono', monospace;
	--framer-font-style: normal;
	--framer-font-weight: 500;
	--framer-text-color: #ffffff;
	--framer-font-size: 16px;
	--framer-letter-spacing: -0.6px;
	--framer-text-transform: none;
	--framer-text-decoration: none;
	--framer-line-height: 1em;
	--framer-link-text-color: #0099ff;
	--framer-link-text-decoration: underline;
	--framer-text-alignment: center;
	box-sizing: border-box;
	-webkit-font-smoothing: inherit;
	text-align: var(--framer-text-alignment, start);
	pointer-events: unset;
	font-size: 0;
	line-height: 0;
	tab-size: 4;
	white-space: inherit;
	word-wrap: inherit;
`;

const SpanTwo = styled('span')`
	cursor: inherit;
	text-align: center;
	line-height: 0;
	tab-size: 4;
	white-space: inherit;
	word-wrap: inherit;
	box-sizing: border-box;
	-webkit-font-smoothing: inherit;
	pointer-events: unset;
	display: block;
	direction: ltr;
	font-size: 0;
`;

const SpanThree = styled('span')`
	cursor: inherit;
	--framer-font-family: 'DM Mono', monospace;
	--framer-font-style: normal;
	--framer-font-weight: 500;
	--framer-text-color: #ffffff;
	--framer-font-size: 16px;
	--framer-letter-spacing: -0.6px;
	--framer-text-transform: none;
	--framer-text-decoration: none;
	--framer-line-height: 1em;
	--framer-link-text-color: #0099ff;
	--framer-link-text-decoration: underline;
	--framer-text-alignment: center;
	text-align: var(--framer-text-alignment, start);
	tab-size: 4;
	white-space: inherit;
	word-wrap: inherit;
	direction: ltr;
	box-sizing: border-box;
	-webkit-font-smoothing: inherit;
	pointer-events: unset;
	display: unset;
	font-family: var(--font-family);
	font-style: var(--font-style);
	font-weight: min(calc(var(--framer-font-weight-increase, 0) + var(--font-weight, 400)), 900);
	color: var(--text-color);
	letter-spacing: var(--letter-spacing);
	font-size: var(--font-size);
	text-transform: var(--text-transform);
	text-decoration: var(--text-decoration);
	line-height: var(--line-height);
	--font-family: var(--framer-font-family);
	--font-style: var(--framer-font-style);
	--font-weight: var(--framer-font-weight);
	--text-color: var(--framer-text-color);
	--letter-spacing: var(--framer-letter-spacing);
	--font-size: var(--framer-font-size);
	--text-transform: var(--framer-text-transform);
	--text-decoration: var(--framer-text-decoration);
	--line-height: var(--framer-line-height);
`;
