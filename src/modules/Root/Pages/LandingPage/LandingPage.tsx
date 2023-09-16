import React, { Suspense } from 'react';

import HeroSection from './sections/HeroSection';

const FeaturesSection = React.lazy(() => import('./sections/FeaturesSection'));
const PricingSection = React.lazy(() => import('./sections/PricingSection'));
const ContactSection = React.lazy(() => import('./sections/ContactSection'));

const LandingPage: React.FC = () => {
	return (
		<>
			<HeroSection />
			<Suspense>
				<FeaturesSection />
				<PricingSection />
				<ContactSection />
			</Suspense>
		</>
	);
};

export default LandingPage;
