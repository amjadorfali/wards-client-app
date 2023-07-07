import React, { Suspense } from 'react';

import HeroSection from './sections/HeroSection';

const FeaturesSection = React.lazy(() => import('./sections/FeaturesSection'));
const PricingSection = React.lazy(() => import('./sections/PricingSection'));
const CallToActionSection = React.lazy(() => import('./sections/CallToActionSection'));

const LandingPage: React.FC = () => {
	return (
		<>
			<HeroSection />
			<Suspense>
				<FeaturesSection />
				<PricingSection />
				<CallToActionSection />
			</Suspense>
		</>
	);
};

export default LandingPage;
