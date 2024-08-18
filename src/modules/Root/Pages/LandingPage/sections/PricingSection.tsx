import React, { useEffect } from 'react';
import {
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
	useTheme
} from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';

import { AttachMoney, Check } from '@mui/icons-material';
import { useAnimate, useInView } from 'framer-motion';
import { NEW_PRICING_CONTENT, PricingContent, PricingTypes } from 'config/pricing';
import { ScrollTo } from 'modules/Root/components/Navbar';
import { RoutesConfig } from 'config/Routes/routeConfig';

const animationSequence = Object.keys(PricingTypes).map((id) => [
	`#${id}`,
	{ opacity: 1, scale: [0, 1.1, 1] },
	{ duration: 0.7, at: '-0.3' }
]);
export const PricingSection: React.FC = () => {
	const [scope, animate] = useAnimate<HTMLDivElement>();
	const inView = useInView(scope, { once: true, margin: '0px 0px -22% 0px' });

	useEffect(() => {
		if (inView) {
			animate([...animationSequence], {});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inView]);

	return (
		<Grid id={ScrollTo.PLANS} py={20} container bgcolor={'background.paper'} sx={{ justifyContent: 'center', px: { xs: 2 } }} gap={15}>
			<Grid
				item
				container
				xs={12}
				sx={{ justifyContent: 'center' }}
				alignContent={'center'}
				alignItems={'center'}
				flexWrap={'wrap'}
				gap={1}
			>
				<Grid item>
					<Typography textAlign={'center'} variant="h2">
						Plans
					</Typography>
					<br />
					<Typography textAlign={'center'} variant="subtitle1">
						During our beta period, you can use the platform at no charge!
					</Typography>
				</Grid>
			</Grid>

			<Grid item sx={{ gap: { xs: 3, md: 0 }, justifyContent: 'space-around' }} container alignContent={'center'}>
				{Object.entries(NEW_PRICING_CONTENT).map(([key, content]) => (
					<CustomBillingCard key={key} {...content} />
				))}
			</Grid>
		</Grid>
	);
};

export default PricingSection;

const CustomBillingCard: React.FC<PricingContent> = ({ title, subtitle, features, price, isPopular, disablePrice }) => {
	const theme = useTheme();
	return (
		<Card
			elevation={10}
			sx={{
				borderRadius: 2,
				px: 2.25,
				py: 4,
				flexBasis: { xs: '80%', sm: '50%', md: '33%', lg: '27%', xl: '20%' }
			}}
			container
			flexDirection={'column'}
			justifyContent={'space-between'}
			component={Grid}
			item
		>
			<CardContent sx={{ p: 0 }}>
				<Typography
					component={Grid}
					justifyContent={'space-between'}
					gap={2}
					container
					item
					sx={{ textTransform: 'capitalize' }}
					variant={'h4'}
				>
					{title}
					{/* FIXME: Re-add once billing is ready */}
					{/* {isPopular && <Chip label="Popular" color="primary" />} */}
				</Typography>
				<br />
				<Grid container>
					{!disablePrice && (
						<Grid item alignSelf={'flex-start'}>
							<AttachMoney />
						</Grid>
					)}
					<Typography lineHeight={'3.5rem'} fontWeight={700} style={{ fontSize: '3rem' }}>
						{price}
					</Typography>
					{!disablePrice && (
						<Typography variant="subtitle1" component={Grid} item alignSelf={'flex-end'}>
							/mo
						</Typography>
					)}
				</Grid>
				<br />

				<Typography sx={{ color: theme.palette.text.secondary }} variant="subtitle2">
					{subtitle}
				</Typography>

				<Divider sx={{ py: 2, px: 1 }} />
				<List>
					{features.map((feature) => (
						<ListItem sx={{ color: theme.palette.text.secondary, stroke: theme.palette.secondary.light, py: 1, px: 0 }} key={feature}>
							<ListItemIcon sx={{ minWidth: '2.5rem' }}>{<Check />}</ListItemIcon>
							<ListItemText>{feature}</ListItemText>
						</ListItem>
					))}
				</List>
			</CardContent>

			<CardActions sx={{ placeSelf: 'center' }}>
				<Button
					sx={{ textTransform: 'capitalize' }}
					color={!isPopular ? 'secondary' : undefined}
					variant={isPopular ? 'contained' : 'outlined'}
					size="large"
					component={RouterLink}
					to={`${RoutesConfig.dashboard}`}
				>
					{/* FIXME: Change to choose plan when billing is ready */}
					Start now!
				</Button>
			</CardActions>
		</Card>
	);
};
