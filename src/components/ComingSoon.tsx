import React from 'react';
import { styled } from '@mui/material';

const ComingSoon: React.FC = () => {
	return (
		<Wrapper className="container">
			<div className="content">
				<div className="content__container">
					<p className="content__container__text">Coming</p>

					<ul className="content__container__list">
						<li className="content__container__list__item">Very !</li>
						<li className="content__container__list__item">Soon !</li>
					</ul>
				</div>
			</div>
		</Wrapper>
	);
};
export default ComingSoon;

const Wrapper = styled('div')`
	.container {
	}

	.content {
		display: block;
		position: sticky;
		overflow: hidden;
		font-family: 'Lato', sans-serif;
		line-height: 40px;
	}

	.content__container {
		font-weight: 600;
		overflow: hidden;
		height: 40px;
		padding: 0 1.5rem;
	}

	.content__container:before {
		content: '[';
		left: 0;
	}

	.content__container:after {
		content: ']';
		position: absolute;
		right: 0;
	}

	.content__container:after,
	.content__container:before {
		position: absolute;
		top: -2px;
		color: ${({ theme }) => theme.palette.primary.main};
		font-size: 42px;
		line-height: 40px;
		-webkit-animation-name: opacity;
		-webkit-animation-duration: 2s;
		-webkit-animation-iteration-count: infinite;
		animation-name: opacity;
		animation-duration: 2s;
		animation-iteration-count: infinite;
	}

	.content__container__text {
		display: inline;
		float: left;
		margin: 0;
	}

	.content__container__list {
		margin-top: 0;
		padding-left: 5rem;
		text-align: left;
		list-style: none;
		-webkit-animation-name: change;
		-webkit-animation-duration: 5s;
		-webkit-animation-iteration-count: infinite;
		animation-name: change;
		animation-duration: 5s;
		animation-iteration-count: infinite;
	}

	.content__container__list__item {
		line-height: 40px;
		margin: 0;
	}

	@keyframes opacity {
		0%,
		100% {
			opacity: 0;
		}

		50% {
			opacity: 1;
		}
	}

	@keyframes change {
		0%,
		12.66%,
		100% {
			transform: translate3d(0, 0, 0);
		}

		33.32%,
		45.98% {
			transform: translate3d(0, -50%, 0);
		}

		60.3%,
		95.96% {
			transform: translate3d(0, 0, 0);
		}
	}
`;
