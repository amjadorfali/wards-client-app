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
import React from 'react';
import { AttachMoney, Check } from '@mui/icons-material';
import { NEW_PRICING_CONTENT, PricingContent } from 'config/pricing';
import { Link as RouterLink } from 'react-router-dom';
const Billing: React.FC = () => {
	return (
		<Grid container minHeight={'40%'} sx={{ justifyContent: 'center', p: { xs: 2, md: 0 } }} gap={5}>
			<Grid
				item
				container
				xs={12}
				sx={{ justifyContent: { sm: 'space-between' } }}
				alignContent={'center'}
				alignItems={'center'}
				flexWrap={'wrap'}
				gap={1}
			>
				<Grid item xs={12}>
					<Typography variant="h1">Pick a plan</Typography>
					<br />
					<Typography variant="h3">All plans come with a 30-day money-back guarantee.</Typography>
				</Grid>

				<Grid container item xs={12} sx={{ gap: { xs: 4, md: 0 }, placeItems: 'flex-end', justifyContent: 'space-between' }}>
					{/* FIXME: Renable once billing is ready */}
					{/* <Grid item container xs={12} sm={8} md={6} lg={5} justifyContent={'space-between'} alignItems={'flex-end'}>
						<Typography variant="body1">Monthly Plans</Typography>

						<Switch disabled sx={{ mb: '-0.3em' }} checked={isAnnualPlan} onChange={(e) => setIsAnnualPlan(e.target.checked)} />
						<Typography variant="body1" component={Grid} flexDirection={'column'} alignItems={'center'} container item xs={5}>
							<Typography variant="subtitle1" color={'secondary'}>
								(Save 20%)
							</Typography>
							Annual Plans
						</Typography>
					</Grid> */}
				</Grid>
			</Grid>

			{/* // FIXME: Fix justifyContent when pricing is ready */}
			<Grid item sx={{ gap: { xs: 3, md: 0 } }} container justifyContent={'center'} alignContent={'center'}>
				{Object.entries(NEW_PRICING_CONTENT).map(([key, content]) => (
					<CustomCard key={key} {...content} />
				))}
			</Grid>
		</Grid>
	);
};

export default Billing;

const CustomCard: React.FC<PricingContent> = ({ title, subtitle, features, price, isPopular, disablePrice }) => {
	const theme = useTheme();
	return (
		<Card
			elevation={10}
			sx={{
				borderRadius: 2,
				px: 2.25,
				py: 4,
				// FIXME: Fix flexbasis when pricing is ready
				flexBasis: { xs: '100%', md: '45%' }
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
					variant={'h2'}
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
					<Typography lineHeight={'3.5rem'} fontWeight={700} style={{ fontSize: '4rem' }}>
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
					component={RouterLink}
					target="_blank"
					to="https://wards.lemonsqueezy.com/checkout/buy/294d6b00-994e-4a76-a7f6-31c80e69171b?discount=0"
				>
					Choose plan
				</Button>
			</CardActions>
		</Card>
	);
};
