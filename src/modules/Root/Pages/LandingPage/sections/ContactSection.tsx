import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { RoutesConfig } from 'config/Routes/routeConfig';
import { COMPANY_EMAIL, COMPANY_PHONE } from 'config/literals';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Mail, Phone } from '@mui/icons-material';
import { ScrollTo } from 'modules/Root/components/Navbar';
const content = {
	title: "You can contact us 24/7 - We're here to help.",
	subtitle: 'You can contact us on WhatsApp',
	callToAction1: { text: 'Get started', link: RoutesConfig.signUp },
	callToAction2: { text: 'Email Us', link: `mailto:${COMPANY_EMAIL}` },
	callToAction3: { text: 'Call Us', link: `tel:${COMPANY_PHONE}` }
};
export const ContactSection: React.FC = () => {
	return (
		<Grid id={ScrollTo.CONTACT} py={15} gap={5} container textAlign={'center'} justifyContent={'center'} alignContent={'center'}>
			<Typography variant={'h3'} component={Grid} item xs={12}>
				{content.title}
			</Typography>
			<Typography color={'text.secondary'} component={Grid} justifyContent={'center'} gap={1} container item xs={12}>
				{content.subtitle}
				<WhatsAppIcon color="success" />
			</Typography>

			<Grid item container xs={6} md={3} justifyContent={'center'} gap={3} alignContent={'center'}>
				<Grid item xs={12} lg={5}>
					<Button
						startIcon={<Mail />}
						variant="outlined"
						fullWidth
						size="large"
						component={RouterLink}
						to={content.callToAction2.link}
					>
						{content.callToAction2.text}
					</Button>
				</Grid>
				<Grid item xs={12} lg={5}>
					<Button
						startIcon={<Phone />}
						variant="outlined"
						fullWidth
						size="large"
						component={RouterLink}
						to={content.callToAction3.link}
					>
						{content.callToAction3.text}
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default ContactSection;
