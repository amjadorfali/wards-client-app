import HobbyTierImg from 'assets/hobby.jpg?w=1000&h=1050&format=webp&imagetools';
import SupporterTierImg from 'assets/supporter.png?w=1000&h=1050&format=webp&imagetools';
import BusinessTierImg from 'assets/business.jpeg?w=1000&h=1050&format=webp&imagetools';

export const PricingTypes = {
	hobby: 'hobby',
	supporter: 'supporter',
	business: 'business'
};

export interface PricingContent {
	image: string;
	title: string;
	subtitle: string;
	price: string;
	priceDescription: string;
	features: string[];
	isPopular?: boolean;
}
export const PRICING_CONTENT: { [key in keyof typeof PricingTypes]: PricingContent } = {
	hobby: {
		title: 'Hobby',
		subtitle: 'Try out everything RemoteOps can do, absolutely free',
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
		features: ['All features from the Hobby plan', '20 health-checks and alarms', 'Advanced data visualization', 'Priority Support'],
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

export const NEW_PRICING_CONTENT: { [key in keyof typeof PricingTypes]: PricingContent } = {
	hobby: {
		title: 'Hobby',
		subtitle: 'For those just starting out',
		price: '0',
		priceDescription: 'Free, forever',
		features: ['Real-time monitoring and log tracking', '5 health-checks and alarms', 'Basic Support'],
		image: HobbyTierImg
	},
	supporter: {
		title: 'Supporter',
		subtitle: 'Great for small businesses',
		price: '4',
		priceDescription: 'per month',
		features: ['All features from the Hobby plan', '20 health-checks and alarms', 'Advanced data visualization', 'Priority Support'],
		image: SupporterTierImg,
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
		],
		image: BusinessTierImg
	}
};
