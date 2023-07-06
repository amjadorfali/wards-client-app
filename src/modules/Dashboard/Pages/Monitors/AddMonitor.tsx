import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import DeleteIcon from '@mui/icons-material/Delete';
import {
	Button,
	Checkbox,
	Collapse,
	Divider,
	FormControlLabel,
	FormGroup,
	FormHelperText,
	FormLabel,
	Grid,
	IconButton,
	Link,
	MenuItem,
	Paper,
	Select,
	Typography
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ControlledTextField from 'components/inputs/ControlledTextfield';
import { Controller, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { COMPANY_EMAIL } from 'config/literals';

type Header = {
	[key: `header-name-${number}`]: string;
	[key: `header-value-${number}`]: string;
};

interface AddMonitorFormValues extends Header {
	url: string;
	alert: string;
	timezone: string;
	'monitor-name': string;
	'http-auth-username': string;
	'http-auth-password': string;
	'send-email': boolean;
	'indcident-occurs': number;
	'request-timeout': number;
	'recovery-period': number;
	'confirmation-period': number;
	'check-frequency': number;
	'domain-expiration': number;
	'ssl-verification': number;
	'ssl-expiration': number;
	'http-method': string;
	'request-body': string;
}
const AddMonitor: React.FC = () => {
	// examples with mui components https://codesandbox.io/s/react-hook-form-v7-controller-forked-nxrd46?file=/src/index.js:697-708
	const addMonitorForm = useForm<AddMonitorFormValues>();
	const [advancedSettingsOpen, setAdvancedSettingsOpen] = useState(false);
	const handleSubmit = (data: AddMonitorFormValues) => {
		console.log(data);
	};

	const [requestHeadersCount, setRequestHeadersCount] = useState([1]);

	const toggleAdvancedSettings = () => {
		setAdvancedSettingsOpen(!advancedSettingsOpen);
	};
	const formValues = addMonitorForm.watch();

	useEffect(() => {
		console.log(formValues);
	}, [formValues]);

	const handleDeleteHeader = (headerNumber: number) => {
		setRequestHeadersCount((prev) => prev.filter((header) => header !== headerNumber));
		addMonitorForm.unregister(`header-name-${headerNumber}`);
		addMonitorForm.unregister(`header-value-${headerNumber}`);
	};

	const handleAddHeader = () => {
		setRequestHeadersCount((prev) => [...prev, (prev[prev.length - 1] || 0) + 1]);
	};
	return (
		<Grid container alignContent={'center'} justifyContent={'center'} sx={{}}>
			<Grid item xs={12}>
				<Button component={RouterLink} to={`../`} startIcon={<ArrowBackIcon />}>
					Monitors
				</Button>
			</Grid>
			<Grid item xs={12}>
				<Typography variant="h2">Create monitor</Typography>
			</Grid>
			<br />
			<br />
			<br />

			<Grid gap={4} container item xs={12} component={'form'} onSubmit={addMonitorForm.handleSubmit(handleSubmit)}>
				{/* Normal settings */}
				<Grid container item xs={12} gap={4}>
					{/* Monitor URL and Notification methods */}
					<Grid container item sx={{ justifyContent: { lg: 'space-between' } }}>
						<Grid item xs={12} lg={4}>
							<Typography variant="h4">What to monitor</Typography>
							<br />
							<Typography paragraph>
								Configure the target website you want to monitor. You'll find the advanced configuration below, in the advanced
								settings section.
							</Typography>
						</Grid>

						<Grid item xs={12} lg={7} component={Paper} p={2}>
							<FormLabel sx={{ color: 'inherit' }}>
								<>URL to monitor</>
							</FormLabel>
							<ControlledTextField
								controller={{
									rules: {
										required: { value: true, message: 'Please enter a URL' }
									},
									defaultValue: 'https://',
									name: 'url'
								}}
								control={addMonitorForm.control}
								textFieldProps={{
									margin: 'normal',
									helperText: 'Hi this is a help',
									name: 'url',
									fullWidth: true,
									InputLabelProps: { required: true },
									sx: { minHeight: '5rem' },
									type: 'url'
								}}
							/>
							<br />
							<br />
							<FormLabel sx={{ color: 'inherit' }}>
								<>Alert on </>
							</FormLabel>
							<br />
							<Controller
								render={({ field }) => (
									<Select sx={{ width: '40%' }} {...field} onChange={(e) => field.onChange(e.target.value)}>
										<MenuItem value="status">Becomes unavailable</MenuItem>
										<MenuItem value="keyword">Doesn't contain keyword</MenuItem>
										<MenuItem value="keyword_absence">Contains a keyword</MenuItem>
										<MenuItem value="expected_status_code">Returns HTTP status other than</MenuItem>
										<MenuItem value="ping">Doesn't respond to ping</MenuItem>
										<MenuItem value="tcp">Doesn't respond at a TCP port</MenuItem>
										<MenuItem value="udp">Doesn't respond at an UDP port</MenuItem>
										<MenuItem value="smtp">SMTP server doesn't respond</MenuItem>
										<MenuItem value="pop">POP3 server doesn't respond</MenuItem>
										<MenuItem value="imap">IMAP server doesn't respond</MenuItem>
										<MenuItem value="dns">DNS server doesn't respond (beta)</MenuItem>
									</Select>
								)}
								name="alert"
								defaultValue="status"
								control={addMonitorForm.control}
							/>

							{/* <FormHelperText>With label + helper text</FormHelperText> */}
						</Grid>
					</Grid>

					{/* Incident handling */}
					<Grid container item sx={{ justifyContent: { lg: 'space-between' } }}>
						<Grid item xs={12} lg={4}>
							<Typography variant="h4">On-call escalation</Typography>
							<br />
							<Typography paragraph>Set up rules for who's going to be notified and how when an incident occurs.</Typography>
						</Grid>

						<Grid item xs={12} lg={7} component={Paper} p={2}>
							<FormLabel sx={{ color: 'inherit' }}>When there's a new incident</FormLabel>
							<FormGroup>
								<FormControlLabel
									control={
										<Controller
											name="send-email"
											control={addMonitorForm.control}
											defaultValue={true}
											render={({ field }) => <Checkbox onChange={(e) => field.onChange(e.target.checked)} checked={field.value} />}
										/>
									}
									value={'email'}
									label="Send email"
								/>
							</FormGroup>
							<FormLabel sx={{ color: 'inherit' }} component="legend">
								the current on-call person
							</FormLabel>
						</Grid>
					</Grid>

					{/* Notify other team members on incident */}
					<Grid container item sx={{ justifyContent: { lg: 'space-between' } }}>
						<Grid item xs={12} lg={4} alignSelf={'center'}>
							<Typography variant="subtitle1">Notify the entire team as a last resort option.</Typography>

							<Typography variant="subtitle1">Alternatively, set up an advanced escalation policy.</Typography>
						</Grid>

						<Grid item xs={12} lg={7} component={Paper} p={2}>
							<FormLabel sx={{ color: 'inherit' }}> If the on-call person doesn't acknowledge the incident</FormLabel>
							<Controller
								render={({ field }) => (
									<Select fullWidth {...field} onChange={(e) => field.onChange(Number(e.target.value))}>
										<MenuItem value={-1}>Do nothing</MenuItem>
										<MenuItem value={0}>Immediately alert all other team members</MenuItem>
										<MenuItem value={180}>Within 3 minutes, alert all other team members</MenuItem>
										<MenuItem value={300}>Within 5 minutes, alert all other team members</MenuItem>
										<MenuItem value={600}>Within 10 minutes, alert all other team members</MenuItem>
									</Select>
								)}
								name="indcident-occurs"
								defaultValue={-1}
								control={addMonitorForm.control}
							/>
							<FormHelperText>Set up an advanced escalation policy.</FormHelperText>
						</Grid>
					</Grid>
				</Grid>

				<Button onClick={toggleAdvancedSettings}>Advanced settings</Button>
				<Divider sx={{ width: '100%' }} />

				{/* Advanced settings */}
				<Collapse in={advancedSettingsOpen}>
					<Grid container item xs={12} sx={{ justifyContent: { lg: 'space-between' }, gap: { xs: 4, lg: 1 } }}>
						{/* Advanced settings config */}
						<Grid item xs={12} lg={4}>
							<Typography variant="h4">Advanced settings</Typography>
							<Typography paragraph>
								If you need something extra you can't configure here, please let us know at{' '}
								<Link href={`mailto:${COMPANY_EMAIL}`} sx={{ fontSize: 'inherit' }}>
									{COMPANY_EMAIL}
								</Link>{' '}
								and we'll make it happen!
							</Typography>
						</Grid>

						<Grid item container gap={2} xs={12} lg={7} component={Paper} p={2} justifyContent={'space-between'}>
							<Grid item xs={12}>
								<FormLabel sx={{ color: 'inherit' }}>Monitor name</FormLabel>
								<ControlledTextField
									controller={{
										defaultValue: '',
										name: 'monitor-name'
									}}
									control={addMonitorForm.control}
									textFieldProps={{
										margin: 'normal',
										helperText: "We'll use this name when we contact you",
										name: 'monitor-name',
										fullWidth: true,
										InputLabelProps: { required: true },
										sx: { minHeight: '5rem' },
										type: 'text'
									}}
								/>
							</Grid>

							<Grid item xs={12} sm={5}>
								<FormLabel sx={{ color: 'inherit' }}>Recovery period</FormLabel>
								<br />
								<Controller
									render={({ field }) => (
										<Select fullWidth {...field} onChange={(e) => field.onChange(Number(e.target.value))}>
											<MenuItem value={0}>Immediate recovery</MenuItem>
											<MenuItem value={60}>1 minute</MenuItem>
											<MenuItem value={180}>3 minutes</MenuItem>
											<MenuItem value={300}>5 minutes</MenuItem>
											<MenuItem value={900}>15 minutes</MenuItem>
											<MenuItem value={1800}>30 minutes</MenuItem>
											<MenuItem value={3600}>1 hour</MenuItem>
											<MenuItem value={7200}>2 hours</MenuItem>
										</Select>
									)}
									name="recovery-period"
									control={addMonitorForm.control}
									defaultValue={180}
								/>
								<FormHelperText>How long the monitor must be up to automatically mark an incident as resolved.</FormHelperText>
							</Grid>
							<Grid item xs={12} sm={5}>
								<FormLabel sx={{ color: 'inherit' }}>Confirmation period</FormLabel>
								<br />
								<Controller
									render={({ field }) => (
										<Select fullWidth {...field} onChange={(e) => field.onChange(Number(e.target.value))}>
											<MenuItem value="0">Immediate start</MenuItem>
											<MenuItem value="5">5 seconds</MenuItem>
											<MenuItem value="10">10 seconds</MenuItem>
											<MenuItem value="15">15 seconds</MenuItem>
											<MenuItem value="30">30 seconds</MenuItem>
											<MenuItem value="60">1 minute</MenuItem>
											<MenuItem value="120">2 minutes</MenuItem>
											<MenuItem value="180">3 minutes</MenuItem>
											<MenuItem value="300">5 minutes</MenuItem>
										</Select>
									)}
									name="confirmation-period"
									defaultValue={0}
									control={addMonitorForm.control}
								/>
								<FormHelperText>How long to wait after observing a failure before we start a new incident.</FormHelperText>
							</Grid>
							<Grid item xs={12} sm={5}>
								<FormLabel sx={{ color: 'inherit' }}>Check frequency</FormLabel>
								<br />
								<Controller
									render={({ field }) => (
										<Select fullWidth {...field} onChange={(e) => field.onChange(Number(e.target.value))}>
											{/* //TODO Discuss this for pricing with Ahmet */}
											<MenuItem disabled value={30}>
												30 seconds
											</MenuItem>
											<MenuItem disabled value={45}>
												45 seconds
											</MenuItem>
											<MenuItem disabled value={60}>
												1 minute
											</MenuItem>
											<MenuItem disabled value={120}>
												2 minutes
											</MenuItem>
											<MenuItem value={180}>3 minutes</MenuItem>
											<MenuItem value={300}>5 minutes</MenuItem>
											<MenuItem value={600}>10 minutes</MenuItem>
											<MenuItem value={900}>15 minutes</MenuItem>
											<MenuItem value={1800}>30 minutes</MenuItem>
										</Select>
									)}
									name="check-frequency"
									defaultValue={180}
									control={addMonitorForm.control}
								/>
								<FormHelperText>How often should we check your monitor?</FormHelperText>
							</Grid>
							<Grid item xs={12} sm={5}>
								<FormLabel sx={{ color: 'inherit' }}>Domain Expiration</FormLabel>
								<br />
								<Controller
									render={({ field }) => (
										<Select fullWidth {...field} onChange={(e) => field.onChange(Number(e.target.value))}>
											<MenuItem value={-1}>Don't check for domain expiration</MenuItem>
											<MenuItem value={1}>Alert 1 day before</MenuItem>
											<MenuItem value={2}>Alert 2 days before</MenuItem>
											<MenuItem value={3}>Alert 3 days before</MenuItem>
											<MenuItem value={7}>Alert 7 days before</MenuItem>
											<MenuItem value={14}>Alert 14 days before</MenuItem>
											<MenuItem value={30}>Alert 1 month before</MenuItem>
											<MenuItem value={60}>Alert 2 months before</MenuItem>
										</Select>
									)}
									name="domain-expiration"
									defaultValue={-1}
									control={addMonitorForm.control}
								/>
							</Grid>
						</Grid>

						{/* SSL verification */}
						<Grid item xs={12} lg={4}>
							<Typography variant="h4">SSL verification</Typography>
						</Grid>

						<Grid item container gap={2} xs={12} lg={7} component={Paper} p={2} justifyContent={'space-between'}>
							<Grid item xs={12} sm={5}>
								<FormLabel sx={{ color: 'inherit', textWrap: 'nowrap' }}>SSL/TLS verification</FormLabel>
								<br />
								<Controller
									render={({ field }) => (
										<Select fullWidth {...field} onChange={(e) => field.onChange(Number(e.target.value))}>
											<MenuItem value={1}>On</MenuItem>
											<MenuItem value={-1}>Off</MenuItem>
										</Select>
									)}
									name="ssl-verification"
									defaultValue={1}
									control={addMonitorForm.control}
								/>
								<FormHelperText>Should we check your security certificates?</FormHelperText>
							</Grid>
							<Grid item xs={12} sm={5}>
								<FormLabel sx={{ color: 'inherit' }}>SSL expiration </FormLabel>
								<br />
								<Controller
									render={({ field }) => (
										<Select fullWidth {...field} onChange={(e) => field.onChange(Number(e.target.value))}>
											<MenuItem value={-1}>Don't check for SSL expiration</MenuItem>
											<MenuItem value={1}>Alert 1 day before</MenuItem>
											<MenuItem value={2}>Alert 2 days before</MenuItem>
											<MenuItem value={3}>Alert 3 days before</MenuItem>
											<MenuItem value={7}>Alert 7 days before</MenuItem>
											<MenuItem value={14}>Alert 14 days before</MenuItem>
											<MenuItem value={30}>Alert 1 month before</MenuItem>
											<MenuItem value={60}>Alert 2 months before</MenuItem>
										</Select>
									)}
									name="ssl-expiration"
									defaultValue={-1}
									control={addMonitorForm.control}
								/>
							</Grid>
						</Grid>

						{/* Request parameters */}
						<Grid item xs={12} lg={4}>
							<Typography variant="h4">Request parameters</Typography>
						</Grid>

						<Grid item container gap={2} xs={12} lg={7} component={Paper} p={2} justifyContent={'space-between'}>
							<Grid item xs={12} sm={5}>
								<FormLabel sx={{ color: 'inherit' }}>HTTP method </FormLabel>
								<br />
								<Controller
									render={({ field }) => (
										<Select fullWidth {...field} onChange={(e) => field.onChange(e.target.value)}>
											<MenuItem value="head">HEAD</MenuItem>
											<MenuItem value="get">GET</MenuItem>
											<MenuItem value="post">POST</MenuItem>
											<MenuItem value="patch">PATCH</MenuItem>
											<MenuItem value="put">PUT</MenuItem>
										</Select>
									)}
									name="http-method"
									defaultValue="get"
									control={addMonitorForm.control}
								/>
							</Grid>
							<Grid item xs={12} sm={5}>
								<FormLabel sx={{ color: 'inherit' }}>Request timeout</FormLabel>
								<br />
								<Controller
									render={({ field }) => (
										<Select fullWidth {...field} onChange={(e) => field.onChange(Number(e.target.value))}>
											<MenuItem value={60}>1 minute</MenuItem>
											<MenuItem value={45}>45 seconds</MenuItem>
											<MenuItem value={30}>30 seconds</MenuItem>
											<MenuItem value={15}>15 seconds</MenuItem>
											<MenuItem value={10}>10 seconds</MenuItem>
											<MenuItem value={5}>5 seconds</MenuItem>
											<MenuItem value={3}>3 seconds</MenuItem>
											<MenuItem value={2}>2 seconds</MenuItem>
										</Select>
									)}
									name="request-timeout"
									defaultValue={30}
									control={addMonitorForm.control}
								/>
								<FormHelperText>This includes both open & read timeout.</FormHelperText>
							</Grid>

							<Grid item xs={12}>
								<FormLabel sx={{ color: 'inherit' }}>Request body for POST, PUT, and PATCH requests</FormLabel>
								<ControlledTextField
									controller={{
										defaultValue: '',
										name: 'request-body'
									}}
									control={addMonitorForm.control}
									textFieldProps={{
										placeholder: 'parameter1=first_value&parameter2=another_value',
										multiline: true,
										margin: 'normal',
										name: 'request-body',
										fullWidth: true,
										InputLabelProps: { required: true },
										sx: { minHeight: '5rem' },
										type: 'text'
									}}
								/>
							</Grid>

							<FormGroup sx={{ flexDirection: 'row', justifyContent: 'space-between', flexBasis: '100%' }}>
								<FormControlLabel control={<Checkbox defaultChecked />} value={'follow-redirects'} label="Follow redirects" />

								<FormControlLabel
									control={
										<Controller
											name="send-email"
											control={addMonitorForm.control}
											defaultValue={true}
											render={({ field }) => <Checkbox onChange={(e) => field.onChange(e.target.checked)} checked={field.value} />}
										/>
									}
									value={'email'}
									label="Send email"
								/>
								<FormControlLabel control={<Checkbox defaultChecked />} value={'keep-cookies'} label="Keep cookies when redirecting" />
							</FormGroup>
						</Grid>

						{/* //TODO Do we need this to be infinite?  */}
						{/* Request headers */}
						<Grid item xs={12} lg={4}>
							<Typography variant="h4">Request headers</Typography>
						</Grid>

						<Grid item container gap={2} xs={12} lg={7} component={Paper} p={2} justifyContent={'space-between'}>
							{requestHeadersCount.map((headerKey) => (
								<React.Fragment key={headerKey}>
									<Grid item xs={12} sm={5}>
										<FormLabel sx={{ color: 'inherit' }}>Header name {headerKey}</FormLabel>
										<ControlledTextField
											controller={{
												defaultValue: '',
												name: `header-name-${headerKey}`
											}}
											control={addMonitorForm.control}
											textFieldProps={{
												placeholder: 'Authorization',
												margin: 'normal',

												name: `header-name-${headerKey}`,
												fullWidth: true,
												InputLabelProps: { required: true },
												sx: { minHeight: '5rem' },
												type: 'text'
											}}
										/>
									</Grid>
									<Grid item xs={12} sm={5}>
										<FormLabel sx={{ color: 'inherit' }}>Header value {headerKey}</FormLabel>
										<ControlledTextField
											controller={{
												defaultValue: '',
												name: `header-value-${headerKey}`
											}}
											control={addMonitorForm.control}
											textFieldProps={{
												placeholder: 'Bearer 12345678abcdef==',
												margin: 'normal',
												name: `header-value-${headerKey}`,
												fullWidth: true,
												InputLabelProps: { required: true },
												sx: { minHeight: '5rem' },
												type: 'text'
											}}
										/>
									</Grid>

									<Grid alignSelf={'center'} item xs={1}>
										<IconButton color="error" onClick={() => handleDeleteHeader(headerKey)}>
											<DeleteIcon />
										</IconButton>
									</Grid>
								</React.Fragment>
							))}

							<Grid item xs={12}>
								<Button onClick={handleAddHeader} variant="contained">
									Add header{' '}
								</Button>
							</Grid>
						</Grid>

						{/* HTTP authentication*/}
						<Grid item xs={12} lg={4}>
							<Typography variant="h4">HTTP authentication</Typography>
						</Grid>

						<Grid item container gap={2} xs={12} lg={7} component={Paper} p={2} justifyContent={'space-between'}>
							<Grid item xs={12} sm={5}>
								<FormLabel sx={{ color: 'inherit' }}>Basic HTTP authentication username</FormLabel>
								<ControlledTextField
									controller={{
										defaultValue: '',
										name: 'http-auth-username'
									}}
									control={addMonitorForm.control}
									textFieldProps={{
										margin: 'normal',
										name: 'http-auth-username',
										fullWidth: true,
										sx: { minHeight: '5rem' },
										type: 'text'
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={5}>
								<FormLabel sx={{ color: 'inherit' }}>Basic HTTP authentication password</FormLabel>
								<ControlledTextField
									controller={{
										defaultValue: '',
										name: 'http-auth-password'
									}}
									control={addMonitorForm.control}
									textFieldProps={{
										margin: 'normal',
										helperText: 'We store it in an encrypted form.',
										name: 'http-auth-password',
										autoComplete: 'off',
										fullWidth: true,
										sx: { minHeight: '5rem' },
										// TODO: Sould we toggle/show the password?
										type: 'password'
									}}
								/>
							</Grid>
						</Grid>

						{/* Maintenance //TODO: Do we need one? */}
						<Grid item xs={12} lg={4}>
							<Typography variant="h4">Maintenance</Typography>
							<Typography paragraph>We'll ignore all incidents during the maintenance window.</Typography>
						</Grid>

						<Grid
							item
							container
							xs={12}
							lg={7}
							component={Paper}
							p={2}
							justifyContent={'space-between'}
							sx={{ gap: { xs: 2, sm: 0 } }}
						>
							<Grid item xs={5} sm={3}>
								<TimePicker defaultValue={dayjs('2022-04-17T15:30')} />
							</Grid>
							<Grid item xs={5} sm={3}>
								<TimePicker defaultValue={dayjs('2022-04-17T15:30')} />
							</Grid>

							<Grid item xs={12} sm={5}>
								<Controller
									render={({ field }) => (
										<Select fullWidth {...field} onChange={(e) => field.onChange(e.target.value)}>
											<MenuItem value="America/Adak">(GMT-10:00) America/Adak</MenuItem>
											<MenuItem value="Hawaii">(GMT-10:00) Hawaii</MenuItem>
											<MenuItem value="Alaska">(GMT-09:00) Alaska</MenuItem>
											<MenuItem value="America/Anchorage">(GMT-09:00) America/Anchorage</MenuItem>
											<MenuItem value="America/Metlakatla">(GMT-09:00) America/Metlakatla</MenuItem>
											<MenuItem value="America/Nome">(GMT-09:00) America/Nome</MenuItem>
											<MenuItem value="America/Sitka">(GMT-09:00) America/Sitka</MenuItem>
											<MenuItem value="America/Yakutat">(GMT-09:00) America/Yakutat</MenuItem>
											<MenuItem value="Pacific Time (US &amp; Canada)">(GMT-08:00) Pacific Time (US &amp; Canada)</MenuItem>
											<MenuItem value="America/Boise">(GMT-07:00) America/Boise</MenuItem>
											<MenuItem value="Arizona">(GMT-07:00) Arizona</MenuItem>
											<MenuItem value="Mountain Time (US &amp; Canada)">(GMT-07:00) Mountain Time (US &amp; Canada)</MenuItem>
											<MenuItem value="America/Indiana/Knox">(GMT-06:00) America/Indiana/Knox</MenuItem>
											<MenuItem value="America/Indiana/Tell_City">(GMT-06:00) America/Indiana/Tell_City</MenuItem>
											<MenuItem value="America/Menominee">(GMT-06:00) America/Menominee</MenuItem>
											<MenuItem value="America/North_Dakota/Beulah">(GMT-06:00) America/North_Dakota/Beulah</MenuItem>
											<MenuItem value="America/North_Dakota/Center">(GMT-06:00) America/North_Dakota/Center</MenuItem>
											<MenuItem value="America/North_Dakota/New_Salem">(GMT-06:00) America/North_Dakota/New_Salem</MenuItem>
											<MenuItem value="Central Time (US &amp; Canada)">(GMT-06:00) Central Time (US &amp; Canada)</MenuItem>
											<MenuItem value="America/Detroit">(GMT-05:00) America/Detroit</MenuItem>
											<MenuItem value="America/Indiana/Marengo">(GMT-05:00) America/Indiana/Marengo</MenuItem>
											<MenuItem value="America/Indiana/Petersburg">(GMT-05:00) America/Indiana/Petersburg</MenuItem>
											<MenuItem value="America/Indiana/Vevay">(GMT-05:00) America/Indiana/Vevay</MenuItem>
											<MenuItem value="America/Indiana/Vincennes">(GMT-05:00) America/Indiana/Vincennes</MenuItem>
											<MenuItem value="America/Indiana/Winamac">(GMT-05:00) America/Indiana/Winamac</MenuItem>
											<MenuItem value="America/Kentucky/Louisville">(GMT-05:00) America/Kentucky/Louisville</MenuItem>
											<MenuItem value="America/Kentucky/Monticello">(GMT-05:00) America/Kentucky/Monticello</MenuItem>
											<MenuItem value="Eastern Time (US &amp; Canada)">(GMT-05:00) Eastern Time (US &amp; Canada)</MenuItem>
											<MenuItem value="Indiana (East)">(GMT-05:00) Indiana (East)</MenuItem>
											<MenuItem value="" disabled>
												-------------
											</MenuItem>
											<MenuItem value="International Date Line West">(GMT-12:00) International Date Line West</MenuItem>
											<MenuItem value="American Samoa">(GMT-11:00) American Samoa</MenuItem>
											<MenuItem value="Midway Island">(GMT-11:00) Midway Island</MenuItem>
											<MenuItem value="Tijuana">(GMT-08:00) Tijuana</MenuItem>
											<MenuItem value="Mazatlan">(GMT-07:00) Mazatlan</MenuItem>
											<MenuItem value="Central America">(GMT-06:00) Central America</MenuItem>
											<MenuItem value="Chihuahua">(GMT-06:00) Chihuahua</MenuItem>
											<MenuItem value="Guadalajara">(GMT-06:00) Guadalajara</MenuItem>
											<MenuItem value="Mexico City">(GMT-06:00) Mexico City</MenuItem>
											<MenuItem value="Monterrey">(GMT-06:00) Monterrey</MenuItem>
											<MenuItem value="Saskatchewan">(GMT-06:00) Saskatchewan</MenuItem>
											<MenuItem value="Bogota">(GMT-05:00) Bogota</MenuItem>
											<MenuItem value="Lima">(GMT-05:00) Lima</MenuItem>
											<MenuItem value="Quito">(GMT-05:00) Quito</MenuItem>
											<MenuItem value="Atlantic Time (Canada)">(GMT-04:00) Atlantic Time (Canada)</MenuItem>
											<MenuItem value="Caracas">(GMT-04:00) Caracas</MenuItem>
											<MenuItem value="Georgetown">(GMT-04:00) Georgetown</MenuItem>
											<MenuItem value="La Paz">(GMT-04:00) La Paz</MenuItem>
											<MenuItem value="Puerto Rico">(GMT-04:00) Puerto Rico</MenuItem>
											<MenuItem value="Santiago">(GMT-04:00) Santiago</MenuItem>
											<MenuItem value="Newfoundland">(GMT-03:30) Newfoundland</MenuItem>
											<MenuItem value="Brasilia">(GMT-03:00) Brasilia</MenuItem>
											<MenuItem value="Buenos Aires">(GMT-03:00) Buenos Aires</MenuItem>
											<MenuItem value="Greenland">(GMT-03:00) Greenland</MenuItem>
											<MenuItem value="Montevideo">(GMT-03:00) Montevideo</MenuItem>
											<MenuItem value="Mid-Atlantic">(GMT-02:00) Mid-Atlantic</MenuItem>
											<MenuItem value="Azores">(GMT-01:00) Azores</MenuItem>
											<MenuItem value="Cape Verde Is.">(GMT-01:00) Cape Verde Is.</MenuItem>
											<MenuItem value="Edinburgh">(GMT+00:00) Edinburgh</MenuItem>
											<MenuItem value="Lisbon">(GMT+00:00) Lisbon</MenuItem>
											<MenuItem value="London">(GMT+00:00) London</MenuItem>
											<MenuItem value="Monrovia">(GMT+00:00) Monrovia</MenuItem>
											<MenuItem value="UTC">(GMT+00:00) UTC</MenuItem>
											<MenuItem value="Amsterdam">(GMT+01:00) Amsterdam</MenuItem>
											<MenuItem value="Belgrade">(GMT+01:00) Belgrade</MenuItem>
											<MenuItem value="Berlin">(GMT+01:00) Berlin</MenuItem>
											<MenuItem value="Bern">(GMT+01:00) Bern</MenuItem>
											<MenuItem value="Bratislava">(GMT+01:00) Bratislava</MenuItem>
											<MenuItem value="Brussels">(GMT+01:00) Brussels</MenuItem>
											<MenuItem value="Budapest">(GMT+01:00) Budapest</MenuItem>
											<MenuItem value="Casablanca">(GMT+01:00) Casablanca</MenuItem>
											<MenuItem value="Copenhagen">(GMT+01:00) Copenhagen</MenuItem>
											<MenuItem value="Dublin">(GMT+01:00) Dublin</MenuItem>
											<MenuItem value="Ljubljana">(GMT+01:00) Ljubljana</MenuItem>
											<MenuItem value="Madrid">(GMT+01:00) Madrid</MenuItem>
											<MenuItem value="Paris">(GMT+01:00) Paris</MenuItem>
											<MenuItem value="Prague">(GMT+01:00) Prague</MenuItem>
											<MenuItem value="Rome">(GMT+01:00) Rome</MenuItem>
											<MenuItem value="Sarajevo">(GMT+01:00) Sarajevo</MenuItem>
											<MenuItem value="Skopje">(GMT+01:00) Skopje</MenuItem>
											<MenuItem value="Stockholm">(GMT+01:00) Stockholm</MenuItem>
											<MenuItem value="Vienna">(GMT+01:00) Vienna</MenuItem>
											<MenuItem value="Warsaw">(GMT+01:00) Warsaw</MenuItem>
											<MenuItem value="West Central Africa">(GMT+01:00) West Central Africa</MenuItem>
											<MenuItem value="Zagreb">(GMT+01:00) Zagreb</MenuItem>
											<MenuItem value="Zurich">(GMT+01:00) Zurich</MenuItem>
											<MenuItem value="Athens">(GMT+02:00) Athens</MenuItem>
											<MenuItem value="Bucharest">(GMT+02:00) Bucharest</MenuItem>
											<MenuItem value="Cairo">(GMT+02:00) Cairo</MenuItem>
											<MenuItem value="Harare">(GMT+02:00) Harare</MenuItem>
											<MenuItem value="Helsinki">(GMT+02:00) Helsinki</MenuItem>
											<MenuItem value="Jerusalem">(GMT+02:00) Jerusalem</MenuItem>
											<MenuItem value="Kaliningrad">(GMT+02:00) Kaliningrad</MenuItem>
											<MenuItem value="Kyiv">(GMT+02:00) Kyiv</MenuItem>
											<MenuItem value="Pretoria">(GMT+02:00) Pretoria</MenuItem>
											<MenuItem value="Riga">(GMT+02:00) Riga</MenuItem>
											<MenuItem value="Sofia">(GMT+02:00) Sofia</MenuItem>
											<MenuItem value="Tallinn">(GMT+02:00) Tallinn</MenuItem>
											<MenuItem value="Vilnius">(GMT+02:00) Vilnius</MenuItem>
											<MenuItem value="Baghdad">(GMT+03:00) Baghdad</MenuItem>
											<MenuItem value="Istanbul">(GMT+03:00) Istanbul</MenuItem>
											<MenuItem value="Kuwait">(GMT+03:00) Kuwait</MenuItem>
											<MenuItem value="Minsk">(GMT+03:00) Minsk</MenuItem>
											<MenuItem value="Moscow">(GMT+03:00) Moscow</MenuItem>
											<MenuItem value="Nairobi">(GMT+03:00) Nairobi</MenuItem>
											<MenuItem value="Riyadh">(GMT+03:00) Riyadh</MenuItem>
											<MenuItem value="St. Petersburg">(GMT+03:00) St. Petersburg</MenuItem>
											<MenuItem value="Volgograd">(GMT+03:00) Volgograd</MenuItem>
											<MenuItem value="Tehran">(GMT+03:30) Tehran</MenuItem>
											<MenuItem value="Abu Dhabi">(GMT+04:00) Abu Dhabi</MenuItem>
											<MenuItem value="Baku">(GMT+04:00) Baku</MenuItem>
											<MenuItem value="Muscat">(GMT+04:00) Muscat</MenuItem>
											<MenuItem value="Samara">(GMT+04:00) Samara</MenuItem>
											<MenuItem value="Tbilisi">(GMT+04:00) Tbilisi</MenuItem>
											<MenuItem value="Yerevan">(GMT+04:00) Yerevan</MenuItem>
											<MenuItem value="Kabul">(GMT+04:30) Kabul</MenuItem>
											<MenuItem value="Ekaterinburg">(GMT+05:00) Ekaterinburg</MenuItem>
											<MenuItem value="Islamabad">(GMT+05:00) Islamabad</MenuItem>
											<MenuItem value="Karachi">(GMT+05:00) Karachi</MenuItem>
											<MenuItem value="Tashkent">(GMT+05:00) Tashkent</MenuItem>
											<MenuItem value="Chennai">(GMT+05:30) Chennai</MenuItem>
											<MenuItem value="Kolkata">(GMT+05:30) Kolkata</MenuItem>
											<MenuItem value="Mumbai">(GMT+05:30) Mumbai</MenuItem>
											<MenuItem value="New Delhi">(GMT+05:30) New Delhi</MenuItem>
											<MenuItem value="Sri Jayawardenepura">(GMT+05:30) Sri Jayawardenepura</MenuItem>
											<MenuItem value="Kathmandu">(GMT+05:45) Kathmandu</MenuItem>
											<MenuItem value="Almaty">(GMT+06:00) Almaty</MenuItem>
											<MenuItem value="Astana">(GMT+06:00) Astana</MenuItem>
											<MenuItem value="Dhaka">(GMT+06:00) Dhaka</MenuItem>
											<MenuItem value="Urumqi">(GMT+06:00) Urumqi</MenuItem>
											<MenuItem value="Rangoon">(GMT+06:30) Rangoon</MenuItem>
											<MenuItem value="Bangkok">(GMT+07:00) Bangkok</MenuItem>
											<MenuItem value="Hanoi">(GMT+07:00) Hanoi</MenuItem>
											<MenuItem value="Jakarta">(GMT+07:00) Jakarta</MenuItem>
											<MenuItem value="Krasnoyarsk">(GMT+07:00) Krasnoyarsk</MenuItem>
											<MenuItem value="Novosibirsk">(GMT+07:00) Novosibirsk</MenuItem>
											<MenuItem value="Beijing">(GMT+08:00) Beijing</MenuItem>
											<MenuItem value="Chongqing">(GMT+08:00) Chongqing</MenuItem>
											<MenuItem value="Hong Kong">(GMT+08:00) Hong Kong</MenuItem>
											<MenuItem value="Irkutsk">(GMT+08:00) Irkutsk</MenuItem>
											<MenuItem value="Kuala Lumpur">(GMT+08:00) Kuala Lumpur</MenuItem>
											<MenuItem value="Perth">(GMT+08:00) Perth</MenuItem>
											<MenuItem value="Singapore">(GMT+08:00) Singapore</MenuItem>
											<MenuItem value="Taipei">(GMT+08:00) Taipei</MenuItem>
											<MenuItem value="Ulaanbaatar">(GMT+08:00) Ulaanbaatar</MenuItem>
											<MenuItem value="Osaka">(GMT+09:00) Osaka</MenuItem>
											<MenuItem value="Sapporo">(GMT+09:00) Sapporo</MenuItem>
											<MenuItem value="Seoul">(GMT+09:00) Seoul</MenuItem>
											<MenuItem value="Tokyo">(GMT+09:00) Tokyo</MenuItem>
											<MenuItem value="Yakutsk">(GMT+09:00) Yakutsk</MenuItem>
											<MenuItem value="Adelaide">(GMT+09:30) Adelaide</MenuItem>
											<MenuItem value="Darwin">(GMT+09:30) Darwin</MenuItem>
											<MenuItem value="Brisbane">(GMT+10:00) Brisbane</MenuItem>
											<MenuItem value="Canberra">(GMT+10:00) Canberra</MenuItem>
											<MenuItem value="Guam">(GMT+10:00) Guam</MenuItem>
											<MenuItem value="Hobart">(GMT+10:00) Hobart</MenuItem>
											<MenuItem value="Melbourne">(GMT+10:00) Melbourne</MenuItem>
											<MenuItem value="Port Moresby">(GMT+10:00) Port Moresby</MenuItem>
											<MenuItem value="Sydney">(GMT+10:00) Sydney</MenuItem>
											<MenuItem value="Vladivostok">(GMT+10:00) Vladivostok</MenuItem>
											<MenuItem value="Magadan">(GMT+11:00) Magadan</MenuItem>
											<MenuItem value="New Caledonia">(GMT+11:00) New Caledonia</MenuItem>
											<MenuItem value="Solomon Is.">(GMT+11:00) Solomon Is.</MenuItem>
											<MenuItem value="Srednekolymsk">(GMT+11:00) Srednekolymsk</MenuItem>
											<MenuItem value="Auckland">(GMT+12:00) Auckland</MenuItem>
											<MenuItem value="Fiji">(GMT+12:00) Fiji</MenuItem>
											<MenuItem value="Kamchatka">(GMT+12:00) Kamchatka</MenuItem>
											<MenuItem value="Marshall Is.">(GMT+12:00) Marshall Is.</MenuItem>
											<MenuItem value="Wellington">(GMT+12:00) Wellington</MenuItem>
											<MenuItem value="Chatham Is.">(GMT+12:45) Chatham Is.</MenuItem>
											<MenuItem value="Nuku'alofa">(GMT+13:00) Nuku'alofa</MenuItem>
											<MenuItem value="Samoa">(GMT+13:00) Samoa</MenuItem>
											<MenuItem value="Tokelau Is.">(GMT+13:00) Tokelau Is.</MenuItem>
										</Select>
									)}
									name="timezone"
									// TODO - If we are setting a maintenance window, figure out how to deal with different timezones
									defaultValue="Istanbul"
									control={addMonitorForm.control}
								/>
								<FormHelperText>
									Right now it's 07:35:44pm +03. You can also configure a team-wide maintenance 'Link here'
								</FormHelperText>
							</Grid>
						</Grid>

						{/* Regions */}
						<Grid item xs={12} lg={4}>
							<Typography variant="h4">Regions</Typography>
							<Typography paragraph>What locations should we check your website from?</Typography>
						</Grid>

						<Grid item container gap={2} xs={12} lg={7} component={Paper} p={2} justifyContent={'space-between'}>
							<FormGroup sx={{ flexDirection: 'row' }}>
								<FormControlLabel control={<Checkbox defaultChecked />} value={'region-america'} label="America" />
								<FormControlLabel control={<Checkbox defaultChecked />} value={'region-europe'} label="Europe" />
								<FormControlLabel control={<Checkbox defaultChecked />} value={'region-asia'} label="Asia" />
								<FormControlLabel control={<Checkbox defaultChecked />} value={'region-australia'} label="Australia" />
							</FormGroup>
						</Grid>
					</Grid>
				</Collapse>
				{/* Advanced settings end */}

				{/* Submit */}
				<Grid item container xs={12} justifyContent={'center'}>
					<Button size="large" variant="contained" type="submit" sx={{ textTransform: 'capitalize' }}>
						Create monitor
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
};
export default AddMonitor;
