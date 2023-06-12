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

import FortniteImg from '/fortnite.webp';
import DotaImg from 'assets/dota.png?w=1000&h=1050&format=webp&imagetools';
import OverwatchImg from 'assets/overwatch.png?w=1000&h=1050&format=webp&imagetools';

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
	card1: 'card1',
	card2: 'card2',
	card3: 'card3'
};

export const PricingSection: React.FC = () => {
	const theme = useTheme();

	const [scope, animate] = useAnimate<HTMLDivElement>();
	const inView = useInView(scope, { once: true, margin: '0px 0px -35% 0px' });

	useEffect(() => {
		if (inView) {
			animate(Object.keys(elements).map((id) => [`#${id}`, { opacity: 1, scale: [0, 1.1, 1] }, { duration: 0.7, at: '-0.3' }]));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inView]);

	return (
		<Grid py={30} container>
			<Grid container item ref={scope} sx={{ justifyContent: { xs: 'center', md: 'space-around' }, gap: { xs: 10, md: 0 } }}>
				<Grid item xs={7} sx={{ opacity: 0 }} id={elements.card1} md={3}>
					<CustomCard
						price="$ 0"
						priceDescription="Free, forever"
						features={['3 Team members', 'Basic Support', 'Fack off']}
						color={theme.palette.primary.main}
						title={'Hobby'}
						subtitle={'Kill yourself'}
						image={FortniteImg}
					/>
				</Grid>
				<Grid item xs={7} sx={{ opacity: 0 }} id={elements.card2} md={3}>
					<CustomCard
						price="$ 4"
						priceDescription="per month"
						features={['All Free features', '3 Team members', 'Priority Support', 'Just the tip']}
						color={theme.palette.secondary.main}
						title={'Supporter'}
						subtitle={'You have hope'}
						image={OverwatchImg}
					/>
				</Grid>
				<Grid item xs={7} sx={{ opacity: 0 }} id={elements.card3} md={3}>
					<CustomCard
						price="$ 30"
						priceDescription="per month"
						features={['All Supporter features', '10 Team members', 'Live support', 'On Demand sexis']}
						color={theme.palette.lighterPrimary['4']}
						title={'Business'}
						subtitle={'Wahesh Qaser'}
						image={DotaImg}
					/>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default PricingSection;
