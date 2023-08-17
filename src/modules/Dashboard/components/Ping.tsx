import { Box, styled } from '@mui/material';
import React from 'react';

const Ping: React.FC<{ customcolor: string; isInfinite?: number }> = ({ isInfinite, customcolor }) => {
	return (
		<Box
			sx={{
				width: '40px',
				height: '40px',
				position: 'relative',
				display: 'inline-block'
			}}
		>
			<CircleMain isinfinite={isInfinite} customcolor={customcolor} />
			<CircleSecondary isinfinite={isInfinite} customcolor={customcolor} />
			<CircleTertiary isinfinite={isInfinite} customcolor={customcolor} />
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

const CircleMain = styled(StyledCircle)<{ customcolor: string; isinfinite?: number }>`
	animation-iteration-count: ${({ isinfinite }) => (isinfinite ? 'infinite' : '2s')};
	z-index: 3;
	background: ${({ customcolor }) => customcolor};
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
const CircleSecondary = styled(StyledCircle)<{ customcolor: string; isinfinite?: number }>`
	animation-iteration-count: ${({ isinfinite }) => (isinfinite ? 'infinite' : '2s')};
	z-index: 2;
	background: ${({ customcolor }) => customcolor}19;
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

const CircleTertiary = styled(StyledCircle)<{ customcolor: string; isinfinite?: number }>`
	animation-iteration-count: ${({ isinfinite }) => (isinfinite ? 'infinite' : '2s')};

	z-index: 1;
	background: ${({ customcolor }) => customcolor}66;
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
