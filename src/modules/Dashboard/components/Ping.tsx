import { Box, styled } from '@mui/material';
import React from 'react';

const Ping: React.FC<{ isSuccess: boolean; isInfinite?: number }> = ({ isSuccess, isInfinite }) => {
	return (
		<Box
			sx={{
				width: '40px',
				height: '40px',
				position: 'relative',
				display: 'inline-block'
			}}
		>
			<CircleMain isinfinite={isInfinite} issuccess={Number(isSuccess)} />
			<CircleSecondary isinfinite={isInfinite} issuccess={Number(isSuccess)} />
			<CircleTertiary isinfinite={isInfinite} issuccess={Number(isSuccess)} />
		</Box>
	);
};

export default Ping;

const StyledCircle = styled(Box)`
	position: absolute;
	top: 15px;
	left: 15px;
	width: 0.75rem;
	height: 0.75rem;
	border-radius: 100px;

	animation-delay: 1s;
	animation-fill-mode: backwards;
	animation-duration: 2s;
	animation-timing-function: linear;
`;

const CircleMain = styled(StyledCircle)<{ issuccess: number; isinfinite?: number }>`
	animation-iteration-count: ${({ isinfinite }) => (isinfinite ? 'infinite' : '2s')};
	z-index: 3;
	background: ${({
		theme: {
			palette: { error, success }
		},
		issuccess
	}) => (issuccess ? success.main : error.main)};
	animation-name: pulsate-main-infinite;

	@keyframes pulsate-main-infinite {
		40% {
			transform: scale(1.5, 1.5);
		}
		60% {
			transform: scale(1.5, 1.5);
		}
	}
`;
const CircleSecondary = styled(StyledCircle)<{ issuccess: number; isinfinite?: number }>`
	animation-iteration-count: ${({ isinfinite }) => (isinfinite ? 'infinite' : '2s')};
	z-index: 2;
	background: ${({
		theme: {
			palette: { error, success }
		},
		issuccess
	}) => (issuccess ? success.main : error.main)}19;
	animation-name: pulsate-secondary-infinite;

	@keyframes pulsate-secondary-infinite {
		10% {
			transform: scale(1, 1);
		}
		30% {
			transform: scale(4, 4);
		}
		80% {
			transform: scale(4, 4);
		}
		100% {
			transform: scale(1, 1);
		}
	}
`;

const CircleTertiary = styled(StyledCircle)<{ issuccess: number; isinfinite?: number }>`
	animation-iteration-count: ${({ isinfinite }) => (isinfinite ? 'infinite' : '2s')};

	z-index: 1;
	background: ${({
		theme: {
			palette: { error, success }
		},
		issuccess
	}) => (issuccess ? success.main : error.main)}66;
	animation-name: pulsate-tertiary;

	@keyframes pulsate-tertiary {
		25% {
			transform: scale(1, 1);
		}
		80% {
			transform: scale(4, 4);
			opacity: 0;
		}
		100% {
			transform: scale(4, 4);
			opacity: 0;
		}
	}
`;
