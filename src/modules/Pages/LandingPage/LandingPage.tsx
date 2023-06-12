import React, { Suspense } from 'react';

import { Navbar } from 'modules/Pages/LandingPage/Navbar';
import HeroSection from './sections/HeroSection';
import { SS_KEY_scroll } from 'hooks';
const SummarySection = React.lazy(() => import('./sections/SummarySection'));
const OurToolsSection = React.lazy(() => import('./sections/OurToolsSection'));
const CodeSection = React.lazy(() => import('./sections/CodeSection'));
const FeaturesSection = React.lazy(() => import('./sections/FeaturesSection'));
const PricingSection = React.lazy(() => import('./sections/PricingSection'));
const CallToActionSection = React.lazy(() => import('./sections/CallToActionSection'));
const Footer = React.lazy(() => import('./sections/Footer'));
import { ScrollRestoration } from 'react-router-dom';

const LandingPage: React.FC = () => {
	return (
		<>
			<Navbar />
			<ScrollRestoration getKey={(location) => location.pathname} storageKey={SS_KEY_scroll} />
			<HeroSection />
			<Suspense fallback={<>You're not supposed to be looking here just yet</>}>
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
