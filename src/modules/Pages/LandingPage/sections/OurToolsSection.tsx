import React from 'react';
import { Box, Grid, Typography, styled, useTheme } from '@mui/material';
import { ReactComponent as OctaconIcon } from 'assets/octagon.svg';
import { ReactComponent as LotusIcon } from 'assets/lotus.svg';

const OurToolsSection: React.FC = () => {
	const theme = useTheme();
	return (
		<>
			<Grid
				pt={20}
				container
				justifyContent={'center'}
				alignContent={'center'}
				sx={{
					minHeight: '120vh',
					background: theme.palette.customBg.secondaryGradient
				}}
			>
				<Grid item container xs={12} justifyContent={'center'} gap={2}>
					<Grid item xs={12}>
						<Typography variant="h2" textAlign={'center'} color={'text.secondary'}>
							Built on powerful
							<br />
							<StyledTitleSpan>enterprise</StyledTitleSpan> tech.
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="subtitle1" textAlign={'center'}>
							We use the latest software to power your data.
							<br />
							Used by the biggest enterprises today, our
							<br />
							stack has stood the test of time.
						</Typography>
					</Grid>
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
					<Grid item xs={12}>
						<Typography variant="subtitle1" fontWeight={600} textAlign={'center'}>
							Lotus 3
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="subtitle1" fontWeight={600} textAlign={'center'} sx={{ color: theme.palette.lighterPrimary['1'] }}>
							Globally available
						</Typography>
					</Grid>

					<Grid item xs={12}>
						<Typography variant="subtitle1" fontWeight={600} textAlign={'center'} sx={{ color: theme.palette.lighterPrimary['2'] }}>
							Up to 1 million data points/s
						</Typography>
					</Grid>

					<Grid item xs={12}>
						<Typography variant="subtitle1" fontWeight={600} textAlign={'center'} sx={{ color: theme.palette.lighterPrimary['3'] }}>
							Up to 10 global data centers in parallel
						</Typography>
					</Grid>

					<Grid item xs={12}>
						<Typography variant="subtitle1" fontWeight={600} textAlign={'center'} sx={{ color: theme.palette.lighterPrimary['4'] }}>
							Up to 100PB fast storage per team account
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

export default OurToolsSection;

//TODO: Cleanup styles and use theme
const StyledTitleSpan = styled('span')(({ theme }) => ({
	color: theme.palette.lighterPrimary['1']
}));

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
