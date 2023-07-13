import { Grid, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import React from 'react';
const PrivacyPolicy: React.FC = () => {
	return (
		<Grid container component={Paper} my={15} mx={'auto'} sx={{ maxWidth: { xs: '95%', md: '60%' } }} p={5} gap={5}>
			<Typography variant="h3">Privacy Policy</Typography>
			<Grid item xs={12}>
				<Typography paragraph>
					At Wards, inclusive of our affiliates (collectively referred to as "Wards", "we", "us", or "our"), we place great emphasis on
					maintaining the security of the information we acquire from you or about you. This Privacy Policy elaborates on our approach
					towards handling the Personal Information that we gather from or about you when you make use of our website, applications,
					and services (jointly referred to as "Services"). However, this Privacy Policy does not cover the content that we process on
					behalf of our business offerings' customers, such as our API. The use of such data is regulated by the customer agreements
					that pertain to the access and usage of those offerings.
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Typography variant="h4">1. Collection of Personal Information</Typography>
				<Typography paragraph>
					Our collection of your personal information ("Personal Information") is carried out in the following manner:
				</Typography>
				<List>
					<Typography paragraph>
						Information Given by You: Personal Information is collected when you make an account to access our services or engage with
						us in any of the following ways:
					</Typography>
					<List>
						<ListItem>
							<ListItemText>
								Account Details: When setting up an account, we gather information related to your account such as your name, contact
								information, login credentials, payment card details, and transaction history, which are collectively referred to as
								"Account Information".
							</ListItemText>
						</ListItem>
						<ListItem>
							<ListItemText>
								User Content: Personal Information embedded in the inputs, file uploads, or feedback that you provide while using our
								services is collected (“Content”).
							</ListItemText>
						</ListItem>
						<ListItem>
							<ListItemText>
								Communication Data: If you contact us, we gather your name, contact information, and the content of any messages you
								send, known as “Communication Information”.
							</ListItemText>
						</ListItem>
						<ListItem>
							<ListItemText>
								Social Media Data: We maintain pages on social media platforms such as Instagram, Facebook, Medium, Twitter, YouTube,
								and LinkedIn. When you engage with our social media pages, we collect Personal Information that you choose to share
								with us, including your contact details, collectively termed as “Social Information”. The companies that host our
								social media pages might also provide us with aggregate data and analytics about our social media engagement.
							</ListItemText>
						</ListItem>
					</List>
					<Typography paragraph>
						Personal Information Collected Automatically Through Service Usage: We gather the following data about your visit, usage,
						or interactions when you visit, use or interact with our Services, known as “Technical Information”:
					</Typography>
					<List>
						<ListItem>
							<ListItemText>
								Log Data: This includes information automatically sent by your browser when you use our services. Log data consists of
								your Internet Protocol address, browser type and settings, the date and time of your request, and your interactions
								with our website.
							</ListItemText>
						</ListItem>
						<ListItem>
							<ListItemText>
								Usage Data: We may collect data automatically about your usage of the Services, including the types of content you view
								or engage with, the features you use, and the actions you take, as well as your time zone, country, access dates and
								times, user agent and version, type of computer or mobile device, and your computer connection.
							</ListItemText>
						</ListItem>
						<ListItem>
							<ListItemText>
								Device Data: This consists of the name of the device, operating system, device identifiers, and the browser you are
								using. The type and amount of information collected may depend on the type of device you use and its settings.
							</ListItemText>
						</ListItem>
						<ListItem>
							<ListItemText>
								Cookies: To operate and administer our Services and improve your user experience, we use cookies. A “cookie” is a piece
								of information sent to your browser by a website you visit. You can set your browser to accept all cookies, reject all
								cookies, or notify you whenever a cookie is offered so you can decide whether to accept it each time. However,
								rejecting a cookie might in some cases prevent you from using or negatively impact the display or function of a website
								or certain areas or features of a website. For more details on cookies, please visit All About Cookies.
							</ListItemText>
						</ListItem>
						<ListItem>
							<ListItemText>
								Analytics: We may utilize various online analytics products that use cookies to help us understand how users use our
								Services and enhance your experience when you use the Services.
							</ListItemText>
						</ListItem>
					</List>
				</List>
			</Grid>
			<Grid item xs={12}>
				<Typography variant="h4">2. How we use personal information</Typography>
				<Typography paragraph>We may utilize Personal Information for the objectives listed below:</Typography>
				<List>
					<ListItem>
						<ListItemText>To deliver, oversee, uphold, and/or scrutinize the Services;</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>To enhance our Services and engage in research activities;</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>To interact with you;</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>To devise new initiatives and services;</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>
							To hinder fraudulent activities, criminal conduct, or misuse of our Services, and to safeguard the integrity of our IT
							infrastructure and networks;
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>To execute business transitions; and</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>
							To abide by legal responsibilities and procedures, and to safeguard our rights, privacy, safety, or assets, as well as
							that of our affiliates, you, or other third parties.
						</ListItemText>
					</ListItem>
				</List>
			</Grid>
			<Grid item xs={12}>
				<Typography variant="h4">3. Disclosure of personal information</Typography>
				<Typography paragraph>
					In specific situations, we may need to disclose your Personal Information to third parties without further notifying you,
					unless it's mandated by law:
				</Typography>
				<List>
					<ListItem>
						<ListItemText>
							Third-party Vendors and Service Providers: To help us manage our business operations and provide certain services and
							functions, we might share your Personal Information with third-party vendors and service providers. These could include
							hosting services, cloud services, IT service providers, email communication software, and web analytics services, among
							others. These parties will access, process, or store your Personal Information solely for the purpose of carrying out
							their responsibilities to us, as per our instructions.
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>
							Business Transactions: In the event of a significant business transaction such as strategic deals, reorganization,
							bankruptcy, receivership, or a transition of service to a different provider (collectively referred to as a
							"Transaction"), your Personal Information and other related information may be disclosed during the due diligence process
							to counterparties and other parties involved in the Transaction. As a part of the Transaction, your information may be
							transferred to a successor or affiliate along with other assets.
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>
							Legal Obligations: There may be instances where we need to share your Personal Information, including details about your
							interactions with our Services, with governmental authorities, industry counterparts, or other third parties. This may be
							necessary (i) if we are required to do so by law or believe in good faith that such action is necessary to fulfill a
							legal obligation, (ii) to safeguard and uphold our rights or property, (iii) if we determine that there has been a
							violation of our terms, policies, or the law, (iv) to detect or prevent fraudulent activities or other illegal actions,
							(v) to ensure the safety, security, and integrity of our products, employees, users, or the public, or (vi) to guard
							against legal liability.
						</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemText>
							Affiliates: We may disclose your Personal Information to our affiliated entities. An affiliate is an entity that is
							controlled by, controls, or is under common control with Wards. Our affiliates may utilize the Personal Information we
							share in accordance with this Privacy Policy.
						</ListItemText>
					</ListItem>
				</List>
			</Grid>
			<Grid item xs={12}>
				<Typography variant="h4">4. Changes to the privacy policy</Typography>
				<Typography paragraph>
					This Privacy Policy may be subject to changes at our discretion from time to time. Whenever such changes are made, we will
					make sure to update the version available on this page, unless there's a requirement for a different form of notification
					under the applicable law.
				</Typography>
			</Grid>
		</Grid>
	);
};
export default PrivacyPolicy;
