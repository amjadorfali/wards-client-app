import React, { useEffect } from 'react';
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Grid,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
	useTheme
} from '@mui/material';

import { Check } from '@mui/icons-material';
import { useAnimate, useInView } from 'framer-motion';
import { PRICING_CONTENT, PricingContent, PricingTypes } from 'config/pricing';
import { ScrollTo } from 'modules/Root/components/Navbar';

interface CardProps extends PricingContent {
	color: string;
}

const CustomCard: React.FC<CardProps> = ({ color, image, title, subtitle, features, price, priceDescription }) => {
	const theme = useTheme();
	return (
		<CardActionArea
			sx={{
				borderRadius: 16,
				transition: '0.2s',
				':hover': { transform: 'scale(1.1)', boxShadow: 'none', ':hover': { boxShadow: `0 6px 12px 0 ${color}` } }
			}}
		>
			<Card elevation={10} sx={{ borderRadius: 16 }}>
				<CardMedia sx={{ width: '100%', height: '0', pb: '75%', bgcolor: 'rgba(0, 0, 0, 0.08)' }} image={image} />
				<CardContent sx={{ bgcolor: color }}>
					<Typography sx={{ textTransform: 'uppercase' }} variant={'h4'}>
						{title}
					</Typography>
					<Typography variant="subtitle1">{subtitle}</Typography>
					<br />

					<Typography variant="h4">{price}</Typography>
					<br />

					<Typography>{priceDescription}</Typography>
					<List>
						{features.map((feature) => (
							<ListItem
								sx={{ color: theme.palette.secondary.contrastText, stroke: theme.palette.secondary.contrastText }}
								key={feature}
							>
								<ListItemIcon>{<Check />}</ListItemIcon>
								<ListItemText>{feature}</ListItemText>
							</ListItem>
						))}
					</List>
				</CardContent>
			</Card>
		</CardActionArea>
	);
};

const animationSequence = Object.keys(PricingTypes).map((id) => [
	`#${id}`,
	{ opacity: 1, scale: [0, 1.1, 1] },
	{ duration: 0.7, at: '-0.3' }
]);
export const PricingSection: React.FC = () => {
	const theme = useTheme();

	const [scope, animate] = useAnimate<HTMLDivElement>();
	const inView = useInView(scope, { once: true, margin: '0px 0px -22% 0px' });

	useEffect(() => {
		if (inView) {
			animate([...animationSequence], {});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inView]);

	return (
		<Grid id={ScrollTo.PLANS} py={30} container bgcolor={'background.paper'}>
			<Grid container item ref={scope} sx={{ justifyContent: { xs: 'center', md: 'space-around' }, gap: { xs: 10, md: 0 } }}>
				<Grid item xs={7} sx={{ opacity: 0 }} id={PricingTypes.hobby} md={3}>
					<CustomCard color={theme.palette.primary.light} {...PRICING_CONTENT.hobby} />
				</Grid>
				<Grid item xs={7} sx={{ opacity: 0 }} id={PricingTypes.supporter} md={3}>
					<CustomCard color={theme.palette.primary.main} {...PRICING_CONTENT.supporter} />
				</Grid>
				<Grid item xs={7} sx={{ opacity: 0 }} id={PricingTypes.business} md={3}>
					<CustomCard color={theme.palette.primary.dark} {...PRICING_CONTENT.business} />
				</Grid>
			</Grid>
		</Grid>
	);
};

export default PricingSection;
