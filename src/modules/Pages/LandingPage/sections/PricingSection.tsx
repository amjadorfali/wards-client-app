import React from 'react';
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

export const PricingSection: React.FC = () => {
	const theme = useTheme();
	return (
		<Grid sx={{ justifyContent: { xs: 'center', md: 'space-around' }, gap: { xs: 10, md: 0 } }} py={30} container>
			<Grid item xs={7} md={3}>
				<CustomCard
					price="$ 0"
					priceDescription="Free, forever"
					features={['3 Team members', 'Basic Support', 'Fack off']}
					color={theme.palette.primary.main}
					title={'Hobby'}
					subtitle={'Kill yourself'}
					image={'https://progameguides.com/wp-content/uploads/2019/10/fortnite-outfit-scratch.jpg'}
				/>
			</Grid>
			<Grid item xs={7} md={3}>
				<CustomCard
					price="$ 4"
					priceDescription="per month"
					features={['All Free features', '3 Team members', 'Priority Support', 'Just the tip']}
					color={theme.palette.secondary.main}
					title={'Supporter'}
					subtitle={'You have hope'}
					image={'https://images5.alphacoders.com/690/thumb-1920-690653.png'}
				/>
			</Grid>
			<Grid item xs={7} md={3}>
				<CustomCard
					price="$ 30"
					priceDescription="per month"
					features={['All Supporter features', '10 Team members', 'Live support', 'On Demand sexis']}
					color={theme.palette.lighterPrimary['4']}
					title={'Business'}
					subtitle={'Wahesh Qaser'}
					image={'https://steamcdn-a.akamaihd.net/apps/dota2/images/blog/play/dota_heroes.png'}
				/>
			</Grid>
		</Grid>
	);
};

export default PricingSection;
