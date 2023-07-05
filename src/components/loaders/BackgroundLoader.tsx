import { CircularProgress, Grid, styled } from '@mui/material';
import { useIsFetching } from '@tanstack/react-query';
import React from 'react';

const BackgroundLoader: React.FC = () => {
	const isBackgroundLoading = !!useIsFetching();

	return (
		<Grid container item alignContent={'center'} alignItems={'center'}>
			{isBackgroundLoading ? (
				<CircularProgress color="primary" style={{ width: '2.5rem', height: '2.5rem' }} />
			) : (
				<CheckMarkAnimation>
					<svg className="checkmark" viewBox="0 0 52 52">
						<circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
						<path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
					</svg>
				</CheckMarkAnimation>
			)}
		</Grid>
	);
};

export default BackgroundLoader;

const CheckMarkAnimation = styled('div')`
	.checkmark__circle {
		stroke-dasharray: 166;
		stroke-dashoffset: 166;
		stroke-width: 2;
		stroke-miterlimit: 10;
		stroke: ${({ theme }) => theme.palette.secondary.main};
		fill: none;
		animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
	}

	.checkmark {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		stroke-width: 2;
		stroke: ${({ theme }) => theme.palette.primary.main};
		stroke-miterlimit: 10;
		box-shadow: inset 0px 0px 0px ${({ theme }) => theme.palette.secondary.main};
		animation: fill 0.4s ease-in-out 0.4s forwards, scale 0.3s ease-in-out 0.9s both, checkmark-fade-out 0.5s ease-in-out 2s forwards;
	}

	.checkmark__check {
		transform-origin: 50% 50%;
		stroke-dasharray: 48;
		stroke-dashoffset: 48;
		animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
	}

	@keyframes stroke {
		100% {
			stroke-dashoffset: 0;
		}
	}
	@keyframes scale {
		0%,
		100% {
			transform: none;
		}
		50% {
			transform: scale3d(1.1, 1.1, 1);
		}
	}
	@keyframes fill {
		100% {
			box-shadow: inset 0px 0px 0px 30px ${({ theme }) => theme.palette.secondary.main};
		}
	}

	@keyframes checkmark-fade-out {
		100% {
			visibility: hidden;
			opacity: 0;
			width: 0;
			height: 0;
		}
	}
`;
