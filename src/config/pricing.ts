export const PricingTypes = {
	hobby: 'hobby',
	supporter: 'supporter',
	business: 'business'
};

export interface PricingContent {
	title: string;
	subtitle: string;
	price: string;
	priceDescription: string;
	features: string[];
	isPopular?: boolean;
}

export const NEW_PRICING_CONTENT: { [key in keyof typeof PricingTypes]: PricingContent } = {
	hobby: {
		title: 'Hobby',
		subtitle: 'For those just starting out',
		price: '0',
		priceDescription: 'Free, forever',
		features: ['Real-time monitoring and log tracking', '5 health-checks and alarms', 'Basic Support']
	},
	supporter: {
		title: 'Supporter',
		subtitle: 'Great for small businesses',
		price: '4',
		priceDescription: 'per month',
		features: ['All features from the Hobby plan', '20 health-checks and alarms', 'Advanced data visualization', 'Priority Support'],
		isPopular: true
	},
	business: {
		title: 'Business',
		subtitle: 'For multiple teams',
		price: '30',
		priceDescription: 'per month',
		features: [
			'All features from the Supporter plan',
			'Unlimited health-checks and alarms',
			'Dedicated account manager',
			'Live support'
		]
	}
};
