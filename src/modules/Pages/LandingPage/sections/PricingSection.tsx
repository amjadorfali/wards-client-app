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

import HobbyTierImg from 'assets/hobby.jpg';
import SupporterTierImg from 'assets/supporter.png?w=1000&h=1050&format=webp&imagetools';
import BusinessTierImg from 'assets/business.jpeg?w=1000&h=1050&format=webp&imagetools';

import { Check } from '@mui/icons-material';
import { useAnimate, useInView } from 'framer-motion';

interface CardProps {
	color: string;
	image: string;
	title: string;
	subtitle: string;
	price: string;
	priceDescription: string;
	features: string[];
}

const CustomCard: React.FC<CardProps> = ({ color, image, title, subtitle, features, price, priceDescription }) => {
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
					<Typography sx={{ textTransform: 'uppercase' }} color={'text.secondary'} variant={'h4'}>
						{title}
					</Typography>
					<Typography color={'secondary'} variant="subtitle1">
						{subtitle}
					</Typography>

					<Typography variant="h4" color={'text.secondary'}>
						{price}
					</Typography>
					<Typography variant="subtitle1" color={'text.secondary'}>
						{priceDescription}
					</Typography>
					<List>
						{features.map((feature) => (
							<ListItem key={feature}>
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

const elements = {
	hobby: 'hobby',
	supporter: 'supporter',
	business: 'business'
};

type ContentValue = Omit<CardProps, 'color'>;
const content: { [key in keyof typeof elements]: ContentValue } = {
	hobby: {
		title: 'Hobby',
		subtitle: 'Try out everything Simply-Monitoring can do, absolutely free',
		price: '$ 0',
		priceDescription: 'Free, forever',
		features: ['Real-time monitoring and log tracking', '5 health-checks and alarms', 'Basic Support'],
		image: HobbyTierImg
	},
	supporter: {
		title: 'Supporter',
		subtitle: 'A complete monitoring platform',
		price: '$ 4',
		priceDescription: 'per month',
		features: ['All features from the Free plan', '20 health-checks and alarms', 'Advanced data visualization', 'Priority Support'],
		image: SupporterTierImg
	},
	business: {
		title: 'Business',
		subtitle: 'Flexible power and security',
		price: '$ 30',
		priceDescription: 'per month',
		features: [
			'All features from the Supporter plan',
			'Unlimited health-checks and alarms',
			'Dedicated account manager',
			'Live support'
		],
		image: BusinessTierImg
	}
};

const animationSequence = Object.keys(elements).map((id) => [
	`#${id}`,
	{ opacity: 1, scale: [0, 1.1, 1] },
	{ duration: 0.7, at: '-0.3' }
]);
export const PricingSection: React.FC = () => {
	const theme = useTheme();

	const [scope, animate] = useAnimate<HTMLDivElement>();
	const inView = useInView(scope, { once: true, margin: '0px 0px -35% 0px' });

	useEffect(() => {
		if (inView) {
			animate([...animationSequence], {});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inView]);

	return (
		<Grid py={30} container>
			<Grid container item ref={scope} sx={{ justifyContent: { xs: 'center', md: 'space-around' }, gap: { xs: 10, md: 0 } }}>
				<Grid item xs={7} sx={{ opacity: 0 }} id={elements.hobby} md={3}>
					<CustomCard color={theme.palette.primary.main} {...content.hobby} />
				</Grid>
				<Grid item xs={7} sx={{ opacity: 0 }} id={elements.supporter} md={3}>
					<CustomCard color={theme.palette.textTertiary || ''} {...content.supporter} />
				</Grid>
				<Grid item xs={7} sx={{ opacity: 0 }} id={elements.business} md={3}>
					<CustomCard color={theme.palette.lighterPrimary['4']} {...content.business} />
				</Grid>
			</Grid>
		</Grid>
	);
};

export default PricingSection;
