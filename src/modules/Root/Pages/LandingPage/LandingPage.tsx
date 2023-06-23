import React, { Suspense } from 'react';

import HeroSection from './sections/HeroSection';

const SummarySection = React.lazy(() => import('./sections/SummarySection'));
const OurToolsSection = React.lazy(() => import('./sections/OurToolsSection'));
const CodeSection = React.lazy(() => import('./sections/CodeSection'));
const FeaturesSection = React.lazy(() => import('./sections/FeaturesSection'));
const PricingSection = React.lazy(() => import('./sections/PricingSection'));
const CallToActionSection = React.lazy(() => import('./sections/CallToActionSection'));

const LandingPage: React.FC = () => {
	return (
		<>
			<HeroSection />
			<Suspense>
				<SummarySection />
				<OurToolsSection />
				<CodeSection />
				<FeaturesSection />
				<PricingSection />
				<CallToActionSection />
			</Suspense>
		</>
	);
};

export default LandingPage;