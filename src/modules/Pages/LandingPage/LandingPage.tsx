import React from 'react';

import { Navbar } from 'modules/Pages/LandingPage/Navbar';
import HeroSection from './sections/HeroSection';
import SummarySection from './sections/SummarySection';
import OurToolsSection from './sections/OurToolsSection';

const LandingPage: React.FC = () => {
	return (
		<>
			<Navbar />
			<HeroSection />
			<SummarySection />
			<OurToolsSection />
		</>
	);
};

export default LandingPage;
