import React from 'react';
import { Grid, Typography, styled, useTheme } from '@mui/material';

const HeroSection: React.FC<{ loadOnly?: boolean }> = ({ loadOnly = false }) => {
	const theme = useTheme();

	return (
		<Grid
			container
			sx={{
				minHeight: '100%',
				position: 'relative',
				//Responsive layout
				alignContent: 'center'
			}}
			gap={15}
		>
			<Grid container item xs={12} justifyContent={'center'} height={'fit-content'} gap={10}>
				{!loadOnly && (
					<Grid item xs={12}>
						<Typography variant="h1" color={'text.secondary'} align="center">
							Coming Soon
						</Typography>
					</Grid>
				)}

				<BounceWrapper item xs={12} container justifyContent="center" gap={3}>
					<Grid item className="ball" sx={{ background: theme.palette.primary.main }} />
					<Grid item className="ball" sx={{ background: theme.palette.primary.main }} />
					<Grid item className="ball" sx={{ background: theme.palette.primary.main }} />
				</BounceWrapper>
			</Grid>
		</Grid>
	);
};
export default HeroSection;

const BounceWrapper = styled(Grid)`
	.ball {
		width: 1.565rem;
		height: 1.565rem;
		border-radius: 50%;
		animation: bounce 0.5s alternate infinite;
	}

	.ball:nth-of-type(2) {
		animation-delay: 0.16s;
	}
	.ball:nth-of-type(3) {
		animation-delay: 0.32s;
	}

	@keyframes bounce {
		from {
			transform: scaleX(1.25);
		}
		to {
			transform: translateY(-50px) scaleX(1);
		}
	}

	@keyframes loader {
		0% {
			content: '';
		}

		33% {
			content: ' .';
		}

		66% {
			content: ' ..';
		}

		100% {
			content: ' ...';
		}
	}
`;
