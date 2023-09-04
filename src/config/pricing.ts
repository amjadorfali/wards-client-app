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
	disablePrice?: boolean;
}

// FIXME: Fix pricing content
export const NEW_PRICING_CONTENT: { [key in keyof typeof PricingTypes]?: PricingContent } = {
	hobby: {
		title: 'Beta Access',
		// subtitle: 'For those just starting out',
		subtitle: '',
		price: 'Free!',
		disablePrice: true,
		priceDescription: 'Free',
		features: ['1 User', '5 Monitors', 'Email alerts', '1 Month Data Retention', 'Basic Support']
		// features: []
	}
	// supporter: {
	// 	title: 'Supporter',
	// 	// subtitle: 'Great for small businesses',
	// 	subtitle: '',

	// 	price: '-',
	// 	priceDescription: 'per month',
	// 	// features: ['All features from the Hobby plan', '20 health-checks and alarms', 'Advanced data visualization', 'Priority Support'],
	// 	features: [],
	// 	isPopular: true
	// },
	// business: {
	// 	title: 'Business',
	// 	// subtitle: 'For multiple teams',
	// 	subtitle: '',

	// 	price: '-',
	// 	priceDescription: 'per month',
	// 	features: []

	// 	// features: [
	// 	// 	'All features from the Supporter plan',
	// 	// 	'Unlimited health-checks and alarms',
	// 	// 	'Dedicated account manager',
	// 	// 	'Live support'
	// 	// ]
	// }
};
