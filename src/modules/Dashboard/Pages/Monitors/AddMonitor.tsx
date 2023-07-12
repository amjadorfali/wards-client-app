import React, { useEffect, useMemo, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import ClearIcon from '@mui/icons-material/Clear';
import {
	Button,
	Checkbox,
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

enum AssertionNames {
	RESPONSE_CODE = 'response.code',
	RESPONSE_TIME = 'response.time',
	RESPONSE_VALUE = 'response.value',
	RESPONSE_JSON = 'response.json',
	RESPONSE_HEADER = 'response.header',
	SSL_CERTIFICATE_EXPIRES_IN = 'ssl_certificate.expires_in'
}

enum RequestType {
	HTTP = 'HTTP',
	UDP = 'UDP',
	TCP = 'TCP'
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
	alert: string;
	'monitor-name': string;
	'http-auth-username': string;
	'http-auth-password': string;
	'verify-ssl': boolean;
	'request-timeout': number;
	'check-frequency': number;
	'http-method': string;
	'request-body': string;
	'request-type': RequestType;
}

//TODO: Using textFields, without the need of manually aligning, i can add a space to HelperText and Labels https://mui.com/material-ui/react-text-field/#helper-text
const AddMonitor: React.FC = () => {
	// examples with mui components https://codesandbox.io/s/react-hook-form-v7-controller-forked-nxrd46?file=/src/index.js:697-708
	const addMonitorForm = useForm<AddMonitorFormValues>();
	const theme = useTheme();
	const xsOrSmaller = useMediaQuery(theme.breakpoints.only('xs'));

	const [advancedSettingsOpen, setAdvancedSettingsOpen] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [requestHeadersCount, setRequestHeadersCount] = useState<number[]>([]);
	const [assertionsCount, setAssertionsCount] = useState<number[]>([]);

	const assertionNames = useMemo(() => {
		return assertionsCount.map((assertionKey) => `assertion-name-${assertionKey}` as `assertion-name-${number}`);
	}, [assertionsCount]);

	const assertionValues = addMonitorForm.watch(assertionNames);
	const requestType = addMonitorForm.watch('request-type');

	const verifySslDisabled = useMemo(() => {
		return (
			(requestType && requestType !== RequestType.HTTP) ||
			assertionValues.some((assertionName) => assertionName === AssertionNames.SSL_CERTIFICATE_EXPIRES_IN)
		);
	}, [assertionValues, requestType]);

	const toggleShowPassword = () => setShowPassword(!showPassword);

	const handleSubmit = (data: AddMonitorFormValues) => {
		console.log('submitted');
		data.alert = data.alert + '';
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

	//TODO: Possibly look into deps? addMonitorForm.deps
	const handleAddedSSlAssertion = () => {
		addMonitorForm.setValue('verify-ssl', true);
		//trigger a re-render to show the new field
		setShowPassword(showPassword);
	};

	const handleRequestTypeChange = (value: RequestType, field: ControllerRenderProps<AddMonitorFormValues, 'request-type'>) => {
		//Enforcing a value https://mui.com/material-ui/react-toggle-button/#enforce-value-set
		if (value === null) return;

		field.onChange(value);

		switch (value) {
			case RequestType.HTTP:
				addMonitorForm.setValue('url', 'https://');
				break;

			case RequestType.TCP:
			case RequestType.UDP:
				addMonitorForm.setValue('verify-ssl', false);
				addMonitorForm.setValue('url', '');
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

						<Grid
							item
							xs={12}
							lg={7}
							gap={2}
							container
							component={Paper}
							p={2}
							alignItems={'flex-end'}
							justifyContent={'space-between'}
						>
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
											InputLabelProps={{ required: true }}
											type="url"
											helperText={fieldState.error?.message ?? ''}
											placeholder={
												addMonitorForm.getValues('request-type') === RequestType.HTTP ? 'https://example.com' : '8.8.8.8:53'
											}
											error={!!fieldState.error?.message}
										/>
									)}
									control={addMonitorForm.control}
								/>
							</Grid>

							<Grid item xs={12} sm={5}>
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
													//TODO: Possibly look into deps? addMonitorForm.deps
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
								<InputLabel>Type</InputLabel>
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
							</Grid>
							<Grid item xs={12} sm={5}>
								<InputLabel id="http-method">HTTP method</InputLabel>
								<Controller
									render={({ field }) => (
										<Select labelId="http-method" fullWidth {...field} onChange={(e) => field.onChange(e.target.value)}>
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
								<FormLabel></FormLabel>
								<ControlledTextField
									controller={{
										defaultValue: '',
										name: 'request-body'
									}}
									control={addMonitorForm.control}
									textFieldProps={{
										label: 'Request body for POST, PUT, and PATCH requests',
										placeholder: 'parameter1=first_value&parameter2=another_value',
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
								<FormControlLabel control={<Checkbox defaultChecked />} value={'follow-redirects'} label="Follow redirects" />

								<FormControlLabel control={<Checkbox defaultChecked />} value={'keep-cookies'} label="Keep cookies when redirecting" />
							</FormGroup>
						</Grid>

						{/* Request headers */}
						<Grid item xs={12} lg={4}>
							<Typography variant="h4">Request headers</Typography>
						</Grid>

						<Grid item container gap={2} xs={12} lg={7} component={Paper} p={2}>
							{requestHeadersCount.map((headerKey) => (
								<Grid
									container
									key={headerKey}
									alignItems={'stretch'}
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

									<Grid item pb={2}>
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
								>
									<Add /> Request Header
								</Fab>
							</Grid>
						</Grid>

						{/* Assertions */}
						<Grid item xs={12} lg={4}>
							<Typography variant="h4">Assertions</Typography>
						</Grid>

						<Grid item container xs={12} lg={7} component={Paper} p={2} gap={2}>
							{assertionsCount.map((assertionKey) => (
								<Grid
									container
									key={assertionKey}
									alignItems={'flex-end'}
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
													<MenuItem value={AssertionNames.RESPONSE_CODE}>{AssertionNames.RESPONSE_CODE}</MenuItem>
													<MenuItem value={AssertionNames.RESPONSE_TIME}>{AssertionNames.RESPONSE_TIME}</MenuItem>
													<MenuItem value={AssertionNames.RESPONSE_VALUE}>{AssertionNames.RESPONSE_VALUE}</MenuItem>
													<MenuItem value={AssertionNames.RESPONSE_JSON}>{AssertionNames.RESPONSE_JSON}</MenuItem>
													<MenuItem value={AssertionNames.RESPONSE_HEADER}>{AssertionNames.RESPONSE_HEADER}</MenuItem>
													<MenuItem value={AssertionNames.SSL_CERTIFICATE_EXPIRES_IN}>
														{AssertionNames.SSL_CERTIFICATE_EXPIRES_IN}
													</MenuItem>
												</Select>
											)}
											name={`assertion-name-${assertionKey}`}
											defaultValue={AssertionNames.RESPONSE_CODE}
											control={addMonitorForm.control}
										/>
									</Grid>

									<SelectAssertionValue
										// Key is used to unmount and remount to register new assertions in useForm
										key={addMonitorForm.getValues(`assertion-name-${assertionKey}`)}
										assertionKey={assertionKey}
										form={addMonitorForm}
										addedSSlAssertion={handleAddedSSlAssertion}
									/>
									<Grid item pb={2}>
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

interface SelectAssertionValueProps {
	assertionKey: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	form: UseFormReturn<AddMonitorFormValues, any, undefined>;
	addedSSlAssertion: () => void;
}
const SelectAssertionValue: React.FC<SelectAssertionValueProps> = ({ assertionKey, form, addedSSlAssertion }) => {
	const assertionName: AssertionNames = form.watch(`assertion-name-${assertionKey}`);

	useEffect(() => {
		if (assertionName === AssertionNames.SSL_CERTIFICATE_EXPIRES_IN) {
			addedSSlAssertion();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	switch (assertionName) {
		case AssertionNames.RESPONSE_CODE:
			return (
				<>
					<Grid item xs={12} sm={2}>
						<Controller
							render={({ field }) => (
								<Select fullWidth {...field} onChange={(e) => field.onChange(e.target.value)}>
									<MenuItem value={`<`}>{` < `}</MenuItem>
								</Select>
							)}
							name={`assertion-compare-${assertionKey}`}
							defaultValue={'<'}
							control={form.control}
						/>
					</Grid>

					<Grid item xs={12} sm={4}>
						<ControlledTextField
							controller={{
								name: `assertion-value-${assertionKey}`,
								rules: { required: true, minLength: 1 }
							}}
							control={form.control}
							textFieldProps={{
								error: !!form.formState.errors[`assertion-value-${assertionKey}`],
								label: 'Value',
								placeholder: '200',
								name: `assertion-value-${assertionKey}`,
								fullWidth: true,
								InputLabelProps: { required: true },
								type: 'text'
							}}
						/>
					</Grid>
				</>
			);
		case AssertionNames.RESPONSE_TIME:
			return (
				<>
					<Grid item xs={12} sm={2}>
						<Controller
							render={({ field }) => (
								<Select fullWidth {...field} onChange={(e) => field.onChange(e.target.value)}>
									<MenuItem value={`<`}>{` < `}</MenuItem>
								</Select>
							)}
							name={`assertion-compare-${assertionKey}`}
							defaultValue={'<'}
							control={form.control}
						/>
					</Grid>

					<Grid item xs={12} sm={4}>
						<ControlledTextField
							controller={{
								defaultValue: 1000,
								name: `assertion-value-${assertionKey}`,
								rules: { required: true, min: 1 }
							}}
							control={form.control}
							textFieldProps={{
								label: 'Value',
								error: !!form.formState.errors[`assertion-value-${assertionKey}`],
								placeholder: 'time in ms',
								name: `assertion-value-${assertionKey}`,
								fullWidth: true,
								InputLabelProps: { required: true },
								type: 'number',
								InputProps: {
									endAdornment: <InputAdornment position="end">ms</InputAdornment>
								}
							}}
						/>
					</Grid>
				</>
			);
		case AssertionNames.RESPONSE_VALUE:
			return (
				<>
					<Grid item xs={12} sm={2}>
						<Controller
							render={({ field }) => (
								<Select fullWidth {...field} onChange={(e) => field.onChange(e.target.value)}>
									<MenuItem value={`=`}>{`=`}</MenuItem>
								</Select>
							)}
							name={`assertion-compare-${assertionKey}`}
							defaultValue={'='}
							control={form.control}
						/>
					</Grid>

					<Grid item xs={12} sm={4}>
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
				<Grid container item xs={12} sm={11} pt={3} justifyContent={'space-between'}>
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
								multiline: true,
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
									<MenuItem value={`=`}>{` = `}</MenuItem>
								</Select>
							)}
							name={`assertion-compare-${assertionKey}`}
							defaultValue={'='}
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
				<Grid container item xs={12} sm={11} pt={3} justifyContent={'space-between'}>
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
								multiline: true,
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
								<Select required fullWidth {...field} onChange={(e) => field.onChange(e.target.value)}>
									<MenuItem value={`=`}>{` = `}</MenuItem>
								</Select>
							)}
							name={`assertion-compare-${assertionKey}`}
							defaultValue={'='}
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
						<Controller
							render={({ field }) => (
								<Select fullWidth {...field} onChange={(e) => field.onChange(e.target.value)}>
									<MenuItem value={`<`}>{` < `}</MenuItem>
								</Select>
							)}
							name={`assertion-compare-${assertionKey}`}
							defaultValue={'<'}
							control={form.control}
						/>
					</Grid>

					<Grid item xs={12} sm={3.5}>
						<ControlledTextField
							controller={{
								defaultValue: '',
								name: `assertion-value-${assertionKey}`,
								rules: { min: 0, required: true }
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
								}
							}}
						/>
					</Grid>
				</>
			);
		default:
			return <></>;
	}
};
