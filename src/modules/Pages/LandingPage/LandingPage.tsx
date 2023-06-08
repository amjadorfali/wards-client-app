import React, { Suspense } from 'react';

import { Navbar } from 'modules/Pages/LandingPage/Navbar';
import HeroSection from './sections/HeroSection';
const SummarySection = React.lazy(() => import('./sections/SummarySection'));
const OurToolsSection = React.lazy(() => import('./sections/OurToolsSection'));
const CodeSection = React.lazy(() => import('./sections/CodeSection'));
const FeaturesSection = React.lazy(() => import('./sections/FeaturesSection'));
const PricingSection = React.lazy(() => import('./sections/PricingSection'));
const CallToActionSection = React.lazy(() => import('./sections/CallToActionSection'));
const Footer = React.lazy(() => import('./sections/Footer'));

const LandingPage: React.FC = () => {
	return (
		<>
			<Navbar />
			<HeroSection />
			<Suspense fallback={<>Hey there, still loading...</>}>
				<SummarySection />
				<OurToolsSection />
				<CodeSection />
				<FeaturesSection />
				<PricingSection />
				<CallToActionSection />
				<Footer />
			</Suspense>
		</>
	);
};

export default LandingPage;
