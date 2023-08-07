import React, { useEffect, useMemo, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import ClearIcon from '@mui/icons-material/Clear';
import {
	Box,
	Button,
	Checkbox,
	Chip,
	Collapse,
	Divider,
	Fab,
	FormControlLabel,
	FormGroup,
	FormHelperText,
	FormLabel,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	Link,
	MenuItem,
	Paper,
	Select,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
	useMediaQuery,
	useTheme
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ControlledTextField from 'components/inputs/ControlledTextfield';
import { Controller, ControllerRenderProps, UseFormReturn, useForm } from 'react-hook-form';

import { COMPANY_EMAIL } from 'config/literals';
import { Add, Visibility, VisibilityOff } from '@mui/icons-material';
import useGetCurrentUser from 'modules/Root/Pages/Auth/queries/useGetCurrentUser';
import useCreateMonitor, { CreateMonitorOptions } from 'modules/Dashboard/mutations/useCreateMonitor';

// TODO: utilize those values instead
enum CompareType {
	SMALL = 'SMALL',
	BIG = 'BIG',
	SMALL_EQUAL = 'SMALL_EQUAL',
	BIG_EQUAL = 'BIG_EQUAL',
	EQUAL = 'EQUAL',
	DOES_NOT_CONTAIN = 'DOES_NOT_CONTAIN',
	NOT_EQUAL = 'NOT_EQUAL',
	CONTAINS = 'CONTAINS'
}
enum AssertionNames {
	RESPONSE_CODE = 'RESPONSE_CODE',
	RESPONSE_TIME = 'RESPONSE_TIME',
	RESPONSE_VALUE = 'RESPONSE_VALUE',
	RESPONSE_JSON = 'RESPONSE_JSON',
	RESPONSE_HEADER = 'RESPONSE_HEADER',
	SSL_CERTIFICATE_EXPIRES_IN = 'SSL_CERTIFICATE_EXPIRES_IN'
}

enum RequestType {
	HTTP = 'HTTP',
	UDP = 'UDP',
	TCP = 'TCP'
}

enum Region {
	FRANKFURT = 'FRANKFURT',
	IRELAND = 'IRELAND',
	DUBAI = 'DUBAI',
	SYDNEY = 'SYDNEY',
	CALIFORNIA = 'CALIFORNIA'
}
type CreatableData = {
	[key: `header-name-${number}`]: string;
	[key: `header-value-${number}`]: string;
	[key: `assertion-name-${number}`]: AssertionNames;
	[key: `assertion-key-${number}`]: string;
	[key: `assertion-value-${number}`]: string;
	[key: `assertion-compare-${number}`]: string;
};

interface AddMonitorFormValues extends CreatableData {
	url: string;
	'monitor-name': string;
	'http-auth-username': string;
	'http-auth-password': string;
	'http-method': string;
	'request-body': string;
	'request-type': RequestType;
	regions: Region[];
	'verify-ssl': boolean;
	'follow-redirects': boolean;
	'keep-cookies': boolean;
	'check-frequency': number;
	'request-timeout': number;
}

//TODO: Fix form ids issues that are popping as console errors
const AddMonitor: React.FC = () => {
	// examples with mui components https://codesandbox.io/s/react-hook-form-v7-controller-forked-nxrd46?file=/src/index.js:697-708
	const addMonitorForm = useForm<AddMonitorFormValues>();
	const theme = useTheme();
	const xsOrSmaller = useMediaQuery(theme.breakpoints.only('xs'));
	const { currentTeam } = useGetCurrentUser();
	const { mutate: createMonitor } = useCreateMonitor();
	const [advancedSettingsOpen, setAdvancedSettingsOpen] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [requestHeadersCount, setRequestHeadersCount] = useState<number[]>([]);
	const [assertionsCount, setAssertionsCount] = useState<number[]>([]);

	const assertionNames = useMemo(() => {
		return assertionsCount.map((assertionKey) => `assertion-name-${assertionKey}` as `assertion-name-${number}`);
	}, [assertionsCount]);

	const assertionValues = addMonitorForm.watch(assertionNames);
	const requestType = addMonitorForm.watch('request-type', RequestType.HTTP);

	const followRedirects = addMonitorForm.watch('follow-redirects', true);

	const isHttpRequest = useMemo(() => requestType === RequestType.HTTP, [requestType]);

	const verifySslDisabled = useMemo(() => {
		return (
			(requestType && !isHttpRequest) ||
			assertionValues.some((assertionName) => assertionName === AssertionNames.SSL_CERTIFICATE_EXPIRES_IN)
		);
	}, [assertionValues, requestType, isHttpRequest]);

	const toggleShowPassword = () => setShowPassword(!showPassword);

	const handleSubmit = (data: AddMonitorFormValues) => {
		console.log('submitted', data);
		const assertions: CreateMonitorOptions['metadata']['assertions'] = [];
		const headers: CreateMonitorOptions['metadata']['headers'] = [];

		assertionsCount.forEach((number) => {
			assertions.push({
				key: data[`assertion-key-${number}`],
				value: data[`assertion-value-${number}`],
				compareType: data[`assertion-compare-${number}`],
				type: data[`assertion-name-${number}`]
			});
		});

		requestHeadersCount.forEach((number) => {
			headers.push({ key: data[`header-name-${number}`], value: data[`header-value-${number}`] });
		});

		const dataToSend: CreateMonitorOptions = {
			teamId: currentTeam?.uuid || '',
			name: data['monitor-name'],
			url: data.url,
			timeout: data['request-timeout'],
			method: data['http-method'],
			type: data['request-type'],
			locations: data.regions,
			interval: data['check-frequency'],
			metadata: {
				httpPassword: data['http-auth-password'],
				httpUserName: data['http-auth-username'],
				verifySSL: data['verify-ssl'],
				requestBody: data['request-body'],
				headers,
				assertions
			}
		};
		if (currentTeam?.id)
			createMonitor({
				...dataToSend
			});
	};

	const toggleAdvancedSettings = () => {
		setAdvancedSettingsOpen(!advancedSettingsOpen);
	};

	const handleAddHeader = () => {
		setRequestHeadersCount((prev) => [...prev, (prev[prev.length - 1] || 0) + 1]);
	};

	const handleDeleteHeader = (headerNumber: number) => {
		setRequestHeadersCount((prev) => prev.filter((header) => header !== headerNumber));
		addMonitorForm.unregister(`header-name-${headerNumber}`);
		addMonitorForm.unregister(`header-value-${headerNumber}`);
	};

	const handleAddAssertion = () => {
		setAssertionsCount((prev) => [...prev, (prev[prev.length - 1] || 0) + 1]);
	};

	const handleDeleteAssertion = (assertionNumber: number) => {
		setAssertionsCount((prev) => prev.filter((assertion) => assertion !== assertionNumber));
		addMonitorForm.unregister(`assertion-name-${assertionNumber}`);
		handleUnregisterAssertion(assertionNumber);
	};

	const handleUnregisterAssertion = (assertionNumber: number) => {
		addMonitorForm.unregister(`assertion-value-${assertionNumber}`);
		addMonitorForm.unregister(`assertion-key-${assertionNumber}`);
		addMonitorForm.unregister(`assertion-compare-${assertionNumber}`);
	};

	const handleAddedSSlAssertion = () => {
		addMonitorForm.setValue('verify-ssl', true);
	};

	useEffect(() => {
		const hasSSLAssertion = assertionValues.some((assertion) => assertion === AssertionNames.SSL_CERTIFICATE_EXPIRES_IN);

		if (hasSSLAssertion && !addMonitorForm.getValues('verify-ssl')) {
			handleAddedSSlAssertion();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [assertionValues]);

	const handleRequestTypeChange = (value: RequestType, field: ControllerRenderProps<AddMonitorFormValues, 'request-type'>) => {
		//Enforcing a value https://mui.com/material-ui/react-toggle-button/#enforce-value-set
		if (value === null) return;

		field.onChange(value);

		switch (value) {
			case RequestType.HTTP:
				//Toggle on ssl, redirects, and add url
				addMonitorForm.setValue('verify-ssl', true);
				addMonitorForm.setValue('follow-redirects', true);
				addMonitorForm.setValue('keep-cookies', true);
				addMonitorForm.setValue('url', 'https://');
				break;

			case RequestType.TCP:
			case RequestType.UDP:
				//Toggle off ssl, redirects, and remove url
				addMonitorForm.setValue('verify-ssl', false);
				addMonitorForm.setValue('follow-redirects', false);
				addMonitorForm.setValue('keep-cookies', false);
				addMonitorForm.setValue('url', '');

				//Reset headers and assertions
				setRequestHeadersCount([]);
				assertionsCount.forEach((assertionNumber) => {
					handleUnregisterAssertion(assertionNumber);
					addMonitorForm.unregister(`assertion-name-${assertionNumber}`);
				});
				setAssertionsCount([]);
				break;
			default:
				break;
		}
	};

	return (
		<Grid container alignContent={'center'} justifyContent={'center'} sx={{ px: { xs: 1, sm: 0 } }}>
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
							<Typography paragraph>Configure the target website you want to monitor.</Typography>
						</Grid>

						<Grid item xs={12} lg={7} gap={4} container component={Paper} p={2} justifyContent={'space-between'}>
							<Grid item xs={12}>
								<InputLabel>
									Type
									<br />
									<Controller
										name="request-type"
										control={addMonitorForm.control}
										defaultValue={RequestType.HTTP}
										render={({ field }) => (
											<ToggleButtonGroup
												sx={{ pt: 1, pb: 4 }}
												{...field}
												onChange={(_e, value: RequestType) => handleRequestTypeChange(value, field)}
												color="primary"
												exclusive
												unselectable="on"
												aria-label="request type"
												fullWidth
											>
												<ToggleButton value={RequestType.HTTP}>HTTP</ToggleButton>
												<ToggleButton value={RequestType.UDP}>UDP</ToggleButton>
												<ToggleButton value={RequestType.TCP}>TCP</ToggleButton>
											</ToggleButtonGroup>
										)}
									/>
								</InputLabel>
							</Grid>
							<Grid item xs={12}>
								<Controller
									name="url"
									defaultValue="https://"
									rules={{
										required: { value: true, message: 'Please enter a URL' }
									}}
									render={({ field, fieldState }) => (
										<TextField
											{...field}
											label="URL to monitor"
											fullWidth
											inputMode="url"
											InputLabelProps={{ required: true }}
											type={isHttpRequest ? 'url' : 'text'}
											helperText={fieldState.error?.message ?? ''}
											placeholder={isHttpRequest ? 'https://example.com' : '8.8.8.8:53'}
											error={!!fieldState.error?.message}
										/>
									)}
									control={addMonitorForm.control}
								/>
							</Grid>

							<Grid item xs={12} sm={5}>
								<FormHelperText> </FormHelperText>

								<ControlledTextField
									controller={{
										defaultValue: '',
										name: 'monitor-name',
										rules: { required: { value: true, message: 'Please enter a name for the monitor' } }
									}}
									control={addMonitorForm.control}
									textFieldProps={{
										helperText: addMonitorForm.formState.errors['monitor-name']?.message ?? "We'll use this name when we contact you",
										error: !!addMonitorForm.formState.errors['monitor-name'],
										name: 'monitor-name',
										label: 'Monitor name',
										fullWidth: true,
										id: 'monitor-name',
										InputLabelProps: { required: true },
										type: 'text'
									}}
								/>
							</Grid>

							<Grid item xs={12} sm={5}>
								<InputLabel id="check-frequency">Check Frequency</InputLabel>

								<Controller
									render={({ field }) => (
										<Select labelId="check-frequency" fullWidth {...field} onChange={(e) => field.onChange(Number(e.target.value))}>
											<MenuItem value={30}>30 seconds</MenuItem>
											<MenuItem value={45}>45 seconds</MenuItem>
											<MenuItem value={60}>1 minute</MenuItem>
											<MenuItem value={120}>2 minutes</MenuItem>
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
								<InputLabel id="http-method">HTTP method</InputLabel>
								<Controller
									render={({ field }) => (
										<Select
											disabled={!isHttpRequest}
											labelId="http-method"
											fullWidth
											{...field}
											onChange={(e) => field.onChange(e.target.value)}
										>
											<MenuItem value="HEAD">HEAD</MenuItem>
											<MenuItem value="GET">GET</MenuItem>
											<MenuItem value="POST">POST</MenuItem>
											<MenuItem value="PATCH">PATCH</MenuItem>
											<MenuItem value="PUT">PUT</MenuItem>
										</Select>
									)}
									name="http-method"
									defaultValue="GET"
									control={addMonitorForm.control}
								/>
								<FormHelperText> </FormHelperText>
							</Grid>
							<Grid item xs={12} sm={5}>
								<InputLabel>Request timeout</InputLabel>
								<Controller
									render={({ field }) => (
										<Select fullWidth {...field} onChange={(e) => field.onChange(Number(e.target.value))}>
											<MenuItem value={5}>5 seconds</MenuItem>
											<MenuItem value={10}>10 seconds</MenuItem>
											<MenuItem value={15}>15 seconds</MenuItem>
											<MenuItem value={20}>20 seconds</MenuItem>
											<MenuItem value={25}>25 seconds</MenuItem>
											<MenuItem value={30}>30 seconds</MenuItem>
										</Select>
									)}
									name="request-timeout"
									defaultValue={10}
									control={addMonitorForm.control}
								/>
								<FormHelperText>This includes both open & read timeout.</FormHelperText>
							</Grid>

							<Grid item xs={12}>
								<FormControlLabel
									disabled={verifySslDisabled}
									control={
										<Controller
											name="verify-ssl"
											control={addMonitorForm.control}
											defaultValue={true}
											render={({ field }) => (
												<Checkbox
													name="verify-ssl"
													disabled={verifySslDisabled}
													onChange={(e) => field.onChange(e.target.checked)}
													checked={field.value}
												/>
											)}
										/>
									}
									label="Verify SSL certificate"
								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>

				<Button onClick={toggleAdvancedSettings}>Advanced settings</Button>
				<Divider sx={{ width: '100%' }} />

				{/* Advanced settings */}
				<Collapse in={advancedSettingsOpen}>
					<Grid container item xs={12} sx={{ justifyContent: { lg: 'space-between' }, gap: { xs: 4, lg: 1 } }}>
						{/* Advanced settings config */}
						<Grid item xs={12} pb={6}>
							<Typography variant="h4">Advanced settings</Typography>
							<br />
							<Typography paragraph>
								If you need something extra you can't configure here, please let us know at{' '}
								<Link href={`mailto:${COMPANY_EMAIL}`} sx={{ fontSize: 'inherit' }}>
									{COMPANY_EMAIL}
								</Link>{' '}
								and we'll make it happen!
							</Typography>
						</Grid>

						{/* Request details */}
						<Grid item xs={12} lg={4}>
							<Typography variant="h4">Request details</Typography>
						</Grid>

						<Grid item container gap={2} xs={12} lg={7} component={Paper} p={2} justifyContent={'space-between'}>
							<Grid item xs={12}>
								<FormLabel></FormLabel>
								<ControlledTextField
									controller={{
										defaultValue: '',
										name: 'request-body'
									}}
									control={addMonitorForm.control}
									textFieldProps={{
										label: 'Request body for POST, PUT, and PATCH requests',
										placeholder: '{ "key1" : "value1", "key2" : 2, "key3" : true }',
										multiline: true,
										name: 'request-body',
										fullWidth: true,
										InputLabelProps: { required: true },
										type: 'text'
									}}
								/>
							</Grid>

							{/* TODO: Get back with ahmet if we are gonna add this */}
							<FormGroup sx={{ flexDirection: 'row', justifyContent: 'space-between', flexBasis: '100%' }}>
								<FormControlLabel
									disabled={!isHttpRequest}
									control={
										<Controller
											name="follow-redirects"
											control={addMonitorForm.control}
											defaultValue={true}
											render={({ field }) => (
												<Checkbox
													disabled={!isHttpRequest}
													name="follow-redirects"
													onChange={(e) => {
														addMonitorForm.setValue('keep-cookies', e.target.checked);
														field.onChange(e.target.checked);
													}}
													checked={field.value}
												/>
											)}
										/>
									}
									label="Follow redirects"
								/>

								<FormControlLabel
									disabled={!isHttpRequest || !followRedirects}
									control={
										<Controller
											name="keep-cookies"
											control={addMonitorForm.control}
											defaultValue={true}
											render={({ field }) => (
												<Checkbox
													name="keep-cookies"
													disabled={!isHttpRequest || !followRedirects}
													onChange={(e) => field.onChange(e.target.checked)}
													checked={field.value}
												/>
											)}
										/>
									}
									label="Keep cookies when redirecting"
								/>
							</FormGroup>

							{requestHeadersCount.map((headerKey) => (
								<Grid
									container
									key={headerKey}
									alignItems={'center'}
									sx={{ justifyContent: { xs: 'center', sm: 'space-between' }, gap: { xs: 3, sm: 0 } }}
								>
									<Grid item xs={12} sm={5}>
										<ControlledTextField
											controller={{
												defaultValue: '',
												name: `header-name-${headerKey}`,
												rules: {
													required: { value: true, message: 'Header name is required' }
												}
											}}
											control={addMonitorForm.control}
											textFieldProps={{
												label: 'Header',
												placeholder: 'Authorization',

												name: `header-name-${headerKey}`,
												fullWidth: true,
												InputLabelProps: { required: true },
												type: 'text'
											}}
										/>
									</Grid>
									<Grid item xs={12} sm={5}>
										<ControlledTextField
											controller={{
												defaultValue: '',
												name: `header-value-${headerKey}`,
												rules: {
													required: { value: true, message: 'Header value is required' }
												}
											}}
											control={addMonitorForm.control}
											textFieldProps={{
												label: 'Value',

												placeholder: 'Bearer 12345678abcdef==',
												name: `header-value-${headerKey}`,
												fullWidth: true,
												InputLabelProps: { required: true },
												type: 'text'
											}}
										/>
									</Grid>

									<Grid item>
										{xsOrSmaller ? (
											<Button color="secondary" variant="outlined" onClick={() => handleDeleteHeader(headerKey)}>
												Remove
											</Button>
										) : (
											<IconButton color="secondary" onClick={() => handleDeleteHeader(headerKey)}>
												<ClearIcon />
											</IconButton>
										)}
									</Grid>
								</Grid>
							))}

							<Grid item xs={12} sx={{ pb: { sm: 1 }, pt: { sm: 4 } }}>
								<Fab
									sx={{ textTransform: 'capitalize' }}
									variant="extended"
									onClick={handleAddHeader}
									color="primary"
									aria-label="add"
									disabled={!isHttpRequest}
								>
									<Add /> Request Header
								</Fab>
							</Grid>
						</Grid>

						{/* Assertions */}
						<Grid item xs={12} lg={4}>
							<Typography variant="h4">Assertions</Typography>
						</Grid>

						<Grid
							sx={{
								//Hide input counters for number inputs
								'input::-webkit-outer-spin-button,input::-webkit-inner-spin-button': {
									WebkitAppearance: 'none',
									margin: 0
								},
								'input[type=number]': {
									MozAppearance: 'none'
								}
							}}
							item
							container
							xs={12}
							lg={7}
							component={Paper}
							p={2}
							gap={2}
						>
							{assertionsCount.map((assertionKey) => (
								<Grid
									container
									key={assertionKey}
									alignItems={'center'}
									sx={{ justifyContent: { xs: 'center', sm: 'space-between' }, gap: { xs: 3, sm: 0 } }}
								>
									<Grid item xs={12} sm={'auto'}>
										<InputLabel id="assertion">Assertion</InputLabel>

										<Controller
											render={({ field }) => (
												<Select
													labelId="assertion"
													fullWidth
													{...field}
													onChange={(e) => {
														// Registering new assertions happens in <SelectAssertionValue />
														handleUnregisterAssertion(assertionKey);
														field.onChange(e.target.value as AssertionNames);
													}}
												>
													<MenuItem disabled={!isHttpRequest} value={AssertionNames.RESPONSE_CODE}>
														{AssertionNames.RESPONSE_CODE}
													</MenuItem>
													<MenuItem value={AssertionNames.RESPONSE_TIME}>{AssertionNames.RESPONSE_TIME}</MenuItem>
													<MenuItem disabled={!isHttpRequest} value={AssertionNames.RESPONSE_VALUE}>
														{AssertionNames.RESPONSE_VALUE}
													</MenuItem>
													<MenuItem disabled={!isHttpRequest} value={AssertionNames.RESPONSE_JSON}>
														{AssertionNames.RESPONSE_JSON}
													</MenuItem>
													<MenuItem disabled={!isHttpRequest} value={AssertionNames.RESPONSE_HEADER}>
														{AssertionNames.RESPONSE_HEADER}
													</MenuItem>
													<MenuItem disabled={!isHttpRequest} value={AssertionNames.SSL_CERTIFICATE_EXPIRES_IN}>
														{AssertionNames.SSL_CERTIFICATE_EXPIRES_IN}
													</MenuItem>
												</Select>
											)}
											name={`assertion-name-${assertionKey}`}
											defaultValue={!isHttpRequest ? AssertionNames.RESPONSE_TIME : AssertionNames.RESPONSE_CODE}
											control={addMonitorForm.control}
										/>
									</Grid>

									<SelectAssertionValue
										key={addMonitorForm.getValues(`assertion-name-${assertionKey}`)}
										assertionKey={assertionKey}
										form={addMonitorForm}
									/>
									<Grid item>
										<FormHelperText> </FormHelperText>
										{xsOrSmaller ? (
											<Button color="secondary" variant="outlined" onClick={() => handleDeleteAssertion(assertionKey)}>
												Remove
											</Button>
										) : (
											<IconButton color="secondary" onClick={() => handleDeleteAssertion(assertionKey)}>
												<ClearIcon />
											</IconButton>
										)}
									</Grid>
								</Grid>
							))}

							<Grid item xs={12} sx={{ pb: { sm: 1 }, pt: { sm: 4 } }}>
								<Fab
									sx={{ textTransform: 'capitalize' }}
									variant="extended"
									onClick={handleAddAssertion}
									color="primary"
									aria-label="add"
								>
									<Add /> Assertion
								</Fab>
							</Grid>
						</Grid>

						{/* HTTP authentication*/}
						<Grid item xs={12} lg={4}>
							<Typography variant="h4">Basic HTTP authentication</Typography>
						</Grid>

						<Grid item container gap={2} xs={12} lg={7} component={Paper} p={2} justifyContent={'space-between'}>
							<Grid item xs={12} sm={5}>
								<ControlledTextField
									controller={{
										defaultValue: '',
										name: 'http-auth-username',
										rules: {
											validate: (v) => (!v && addMonitorForm.getValues('http-auth-password') ? 'Username is required' : true),
											deps: ['http-auth-password']
										}
									}}
									control={addMonitorForm.control}
									textFieldProps={{
										label: 'Username',
										name: 'http-auth-username',
										fullWidth: true,
										type: 'text'
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={5}>
								<ControlledTextField
									controller={{
										defaultValue: '',
										name: 'http-auth-password',
										rules: {
											validate: (v) => (!v && addMonitorForm.getValues('http-auth-username') ? 'Password is required' : true),
											deps: ['http-auth-username']
										}
									}}
									control={addMonitorForm.control}
									textFieldProps={{
										label: 'Password',
										helperText: addMonitorForm.formState.errors['http-auth-password']?.message ?? 'We store it in an encypted form',
										name: 'http-auth-password',
										autoComplete: 'off',
										fullWidth: true,
										type: showPassword ? 'text' : 'password',
										InputProps: {
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														aria-label="toggle password visibility"
														onClick={toggleShowPassword}
														onMouseDown={toggleShowPassword}
														edge="end"
													>
														{showPassword ? <VisibilityOff /> : <Visibility />}
													</IconButton>
												</InputAdornment>
											)
										}
									}}
								/>
							</Grid>
						</Grid>

						{/* Regions */}
						<Grid item xs={12} lg={4}>
							<Typography variant="h4">Regions</Typography>
							<Typography paragraph>What locations should we check your website from?</Typography>
						</Grid>

						<Grid item container gap={2} xs={12} lg={7} component={Paper} p={2} justifyContent={'space-between'}>
							<Grid item xs={12}>
								<InputLabel id="region">Regions</InputLabel>

								<Controller
									render={({ field }) => (
										<Select
											multiple
											labelId="region"
											fullWidth
											{...field}
											renderValue={(selected) => (
												<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
													{selected.map((value) => (
														<Chip key={value} label={value} />
													))}
												</Box>
											)}
											onChange={(e) => field.onChange(e.target.value as Region[])}
										>
											{Object.values(Region).map((region) => (
												<MenuItem key={region} value={region}>
													{region}
												</MenuItem>
											))}
										</Select>
									)}
									name="regions"
									defaultValue={Object.values(Region) as Region[]}
									control={addMonitorForm.control}
								/>
							</Grid>
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

interface SelectAssertionValueProps {
	assertionKey: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	form: UseFormReturn<AddMonitorFormValues, any, undefined>;
}
const SelectAssertionValue: React.FC<SelectAssertionValueProps> = ({ assertionKey, form }) => {
	const assertionName: AssertionNames = form.watch(`assertion-name-${assertionKey}`, AssertionNames.RESPONSE_CODE);

	switch (assertionName) {
		case AssertionNames.RESPONSE_CODE:
			return (
				<>
					<Grid item xs={12} sm={2}>
						<FormHelperText> </FormHelperText>
						<Controller
							render={({ field }) => (
								<Select fullWidth {...field} onChange={(e) => field.onChange(e.target.value)}>
									<MenuItem value={CompareType.SMALL_EQUAL}>{` <=`}</MenuItem>
									<MenuItem value={CompareType.BIG_EQUAL}>{` >= `}</MenuItem>
									<MenuItem value={CompareType.EQUAL}>{` = `}</MenuItem>
								</Select>
							)}
							name={`assertion-compare-${assertionKey}`}
							defaultValue={CompareType.EQUAL}
							control={form.control}
						/>
					</Grid>

					<Grid item xs={12} sm={4}>
						<FormHelperText> </FormHelperText>
						<ControlledTextField
							controller={{
								name: `assertion-value-${assertionKey}`,
								rules: { required: true, min: 1, max: 9999, pattern: /[0-9]*/ },
								defaultValue: ''
							}}
							control={form.control}
							textFieldProps={{
								error: !!form.formState.errors[`assertion-value-${assertionKey}`],
								label: 'Value',
								placeholder: '200',
								name: `assertion-value-${assertionKey}`,
								fullWidth: true,
								InputLabelProps: { required: true },
								inputProps: { pattern: '[0-9]*', inputMode: 'numeric', step: '1', onWheel: (e) => e.currentTarget.blur() },
								type: 'number'
							}}
						/>
					</Grid>
				</>
			);
		case AssertionNames.RESPONSE_TIME:
			return (
				<>
					<Grid item xs={12} sm={2}>
						<FormHelperText> </FormHelperText>

						<Controller
							render={({ field }) => (
								<Select fullWidth {...field} onChange={(e) => field.onChange(e.target.value)}>
									<MenuItem value={CompareType.SMALL_EQUAL}>{` <= `}</MenuItem>
									<MenuItem value={CompareType.BIG_EQUAL}>{` >= `}</MenuItem>
								</Select>
							)}
							name={`assertion-compare-${assertionKey}`}
							defaultValue={CompareType.SMALL_EQUAL}
							control={form.control}
						/>
					</Grid>

					<Grid item xs={12} sm={4}>
						<FormHelperText> </FormHelperText>

						<ControlledTextField
							controller={{
								defaultValue: 1000,
								name: `assertion-value-${assertionKey}`,
								rules: { required: true, min: 1, pattern: /[0-9]*/ }
							}}
							control={form.control}
							textFieldProps={{
								label: 'Value',
								error: !!form.formState.errors[`assertion-value-${assertionKey}`],
								placeholder: 'time in ms',
								name: `assertion-value-${assertionKey}`,
								fullWidth: true,
								InputLabelProps: { required: true },
								InputProps: {
									endAdornment: <InputAdornment position="end">ms</InputAdornment>
								},
								inputProps: { pattern: '[0-9]*', inputMode: 'numeric', step: '1', onWheel: (e) => e.currentTarget.blur() },
								type: 'number'
							}}
						/>
					</Grid>
				</>
			);
		case AssertionNames.RESPONSE_VALUE:
			return (
				<>
					<Grid item xs={12} sm={2}>
						<FormHelperText> </FormHelperText>

						<Controller
							render={({ field }) => (
								<Select fullWidth {...field} onChange={(e) => field.onChange(e.target.value)}>
									<MenuItem value={CompareType.CONTAINS}>{' Contains '}</MenuItem>
									<MenuItem value={CompareType.DOES_NOT_CONTAIN}>{' Does not Contains '}</MenuItem>
									<MenuItem value={CompareType.EQUAL}>{' = '}</MenuItem>
									<MenuItem value={CompareType.NOT_EQUAL}>{' != '}</MenuItem>
								</Select>
							)}
							name={`assertion-compare-${assertionKey}`}
							defaultValue={CompareType.CONTAINS}
							control={form.control}
						/>
					</Grid>

					<Grid item xs={12} sm={4}>
						<FormHelperText> </FormHelperText>

						<ControlledTextField
							controller={{
								defaultValue: '',
								name: `assertion-value-${assertionKey}`,
								rules: { required: true, minLength: 1 }
							}}
							control={form.control}
							textFieldProps={{
								label: 'Value',
								error: !!form.formState.errors[`assertion-value-${assertionKey}`],
								multiline: true,
								placeholder: 'text/string',
								name: `assertion-value-${assertionKey}`,
								fullWidth: true,
								InputLabelProps: { required: true },
								type: 'text'
							}}
						/>
					</Grid>
				</>
			);
		case AssertionNames.RESPONSE_JSON:
			return (
				<Grid container item xs={12} sm={11} pt={3} sx={{ gap: { xs: 4, sm: 0 } }} justifyContent={'space-between'}>
					<Grid item xs={12} sm={5}>
						<ControlledTextField
							controller={{
								defaultValue: '',
								name: `assertion-key-${assertionKey}`,
								rules: { required: true, minLength: 1 }
							}}
							control={form.control}
							textFieldProps={{
								label: 'Key',
								error: !!form.formState.errors[`assertion-key-${assertionKey}`],
								placeholder: 'user.posts[0].title',
								name: `assertion-key-${assertionKey}`,
								fullWidth: true,
								InputLabelProps: { required: true },
								type: 'text'
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={2}>
						<Controller
							render={({ field }) => (
								<Select fullWidth {...field} onChange={(e) => field.onChange(e.target.value)}>
									{/* TODO: add rest from cronitor */}
									<MenuItem value={CompareType.EQUAL}>{` = `}</MenuItem>
								</Select>
							)}
							name={`assertion-compare-${assertionKey}`}
							defaultValue={CompareType.EQUAL}
							control={form.control}
						/>
					</Grid>

					<Grid item xs={12} sm={3}>
						<ControlledTextField
							controller={{
								defaultValue: '',
								name: `assertion-value-${assertionKey}`,
								rules: { required: true, minLength: 1 }
							}}
							control={form.control}
							textFieldProps={{
								label: 'Value',
								error: !!form.formState.errors[`assertion-value-${assertionKey}`],
								multiline: true,
								placeholder: 'text/string',
								name: `assertion-value-${assertionKey}`,
								fullWidth: true,
								InputLabelProps: { required: true },
								type: 'text'
							}}
						/>
					</Grid>
				</Grid>
			);
		case AssertionNames.RESPONSE_HEADER:
			return (
				<Grid container item xs={12} sm={11} pt={3} sx={{ gap: { xs: 4, sm: 0 } }} justifyContent={'space-between'}>
					<Grid item xs={12} sm={5}>
						<ControlledTextField
							controller={{
								defaultValue: '',
								name: `assertion-key-${assertionKey}`,
								rules: { required: true, minLength: 1 }
							}}
							control={form.control}
							textFieldProps={{
								label: 'Key',
								error: !!form.formState.errors[`assertion-key-${assertionKey}`],
								placeholder: 'user.posts[0].title',
								name: `assertion-key-${assertionKey}`,
								fullWidth: true,
								InputLabelProps: { required: true },
								type: 'text'
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={2}>
						<Controller
							// {/* TODO: add rest from cronitor */}
							render={({ field }) => (
								<Select required fullWidth {...field} onChange={(e) => field.onChange(e.target.value)}>
									<MenuItem value={CompareType.EQUAL}>{` = `}</MenuItem>
								</Select>
							)}
							name={`assertion-compare-${assertionKey}`}
							defaultValue={CompareType.EQUAL}
							rules={{ required: true }}
							control={form.control}
						/>
					</Grid>

					<Grid item xs={12} sm={3}>
						<ControlledTextField
							controller={{
								defaultValue: '',
								name: `assertion-value-${assertionKey}`,
								rules: { required: true, minLength: 1 }
							}}
							control={form.control}
							textFieldProps={{
								label: 'Value',
								error: !!form.formState.errors[`assertion-value-${assertionKey}`],
								multiline: true,
								placeholder: 'text/string',
								name: `assertion-value-${assertionKey}`,
								fullWidth: true,
								InputLabelProps: { required: true },
								type: 'text'
							}}
						/>
					</Grid>
				</Grid>
			);
		case AssertionNames.SSL_CERTIFICATE_EXPIRES_IN:
			return (
				<>
					<Grid item xs={12} sm={1.5}>
						<FormHelperText> </FormHelperText>

						<Controller
							render={({ field }) => (
								<Select fullWidth {...field} onChange={(e) => field.onChange(e.target.value)}>
									<MenuItem value={CompareType.BIG}>{` > `}</MenuItem>
								</Select>
							)}
							name={`assertion-compare-${assertionKey}`}
							defaultValue={CompareType.BIG}
							control={form.control}
						/>
					</Grid>

					<Grid item xs={12} sm={3.5}>
						<FormHelperText> </FormHelperText>

						<ControlledTextField
							controller={{
								defaultValue: '',
								name: `assertion-value-${assertionKey}`,
								rules: { min: 1, required: true, pattern: /[0-9]*/ }
							}}
							control={form.control}
							textFieldProps={{
								error: !!form.formState.errors[`assertion-value-${assertionKey}`],
								label: 'Value',
								placeholder: '15 days',
								name: `assertion-value-${assertionKey}`,
								fullWidth: true,
								InputLabelProps: { required: true },
								type: 'number',
								InputProps: {
									endAdornment: <InputAdornment position="end">days</InputAdornment>
								},
								inputProps: { pattern: '[0-9]*', inputMode: 'numeric', step: '1', onWheel: (e) => e.currentTarget.blur() }
							}}
						/>
					</Grid>
				</>
			);
		default:
			return <></>;
	}
};
