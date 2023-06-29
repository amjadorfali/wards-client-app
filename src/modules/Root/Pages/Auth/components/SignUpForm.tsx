import { Box, Button, Grid, IconButton, InputAdornment, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import ControlledTextField from 'components/inputs/ControlledTextfield';
import React, { BaseSyntheticEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Circle from '@mui/icons-material/Circle';
import { Link as RouterLink } from 'react-router-dom';
// import useSignUp from './mutations/useSignUp';
import { RoutesConfig } from 'config/Routes/routeConfig';
import { PASSWORD } from 'utils/regex';
import CustomToolTip from 'components/CustomToolTip';
type SignUpFormValues = {
	password: string;
	email: string;
};

interface Props {
	onSignUp: (email: string, password: string) => void;
}
const SignUpForm: React.FC<Props> = ({ onSignUp }) => {
	const signUpForm = useForm<SignUpFormValues>();
	const [showPassword, setShowPassword] = useState(false);

	const toggleShowPassword = () => setShowPassword(!showPassword);

	const handleSignUpSubmit = (data: SignUpFormValues, event?: BaseSyntheticEvent<object, unknown, unknown>) => {
		event && event.preventDefault();
		onSignUp(data.email, data.password);
	};

	return (
		<Box component="form" onSubmit={signUpForm.handleSubmit(handleSignUpSubmit)} noValidate={false} sx={{ mt: 1 }}>
			<ControlledTextField
				textFieldProps={{
					margin: 'normal',
					placeholder: 'me@gmail.com',
					fullWidth: true,
					label: 'Email',
					name: 'email',
					InputLabelProps: { required: true },
					autoComplete: 'username',
					sx: { minHeight: '5rem' },
					type: 'email'
				}}
				controller={{
					rules: {
						required: { value: true, message: 'Please enter your Email' }
						//TODO: Add pattern for removing `+` from email

						// pattern: {
						// 	// eslint-disable-next-line no-useless-escape
						// 	value: RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
						// 	message: 'Invalid Email Address'
						// }
					},
					defaultValue: '',
					name: 'email'
				}}
				control={signUpForm.control}
			/>

			<ControlledTextField
				textFieldProps={{
					margin: 'normal',
					fullWidth: true,
					label: 'Password',
					name: 'password',
					InputLabelProps: { required: true },
					// FIXME: Fix issue with Safari Overriding passwords, as well as colors for input boxes on UserName and Password for all browsers
					autoComplete: 'new-password',
					type: showPassword ? 'text' : 'password',
					sx: { minHeight: '5rem' },
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
						),
						startAdornment: (
							<CustomToolTip
								title={
									<List
										sx={{
											'.MuiListItemText-primary': { fontSize: '1rem' },
											'.MuiSvgIcon-root': { fontSize: '0.5rem' },
											'.MuiListItemIcon-root': { minWidth: '1rem' }
										}}
									>
										<ListItem>
											<ListItemIcon>
												<Circle />
											</ListItemIcon>
											<ListItemText>Contains at least 1 number</ListItemText>
										</ListItem>
										<ListItem>
											<ListItemIcon>
												<Circle />
											</ListItemIcon>
											<ListItemText>Contains at least 1 special character</ListItemText>
										</ListItem>
										<ListItem>
											<ListItemIcon>
												<Circle />
											</ListItemIcon>
											<ListItemText>Contains at least 1 uppercase letter</ListItemText>
										</ListItem>
										<ListItem>
											<ListItemIcon>
												<Circle />
											</ListItemIcon>
											<ListItemText>Contains at least 1 lowercase letter</ListItemText>
										</ListItem>
									</List>
								}
							/>
						)
					}
				}}
				controller={{
					rules: {
						required: { value: true, message: 'Please enter your Password' },
						pattern: { value: PASSWORD, message: 'Invalid Password, please check the password requirements' }
					},
					defaultValue: '',
					name: 'password'
				}}
				control={signUpForm.control}
			/>

			<Button
				type="submit"
				disabled={!!Object.keys(signUpForm.formState.errors).length}
				fullWidth
				variant="contained"
				sx={{ mt: 3, mb: 2 }}
			>
				Sign Up
			</Button>
			<Grid container>
				<Grid item>
					<Link component={RouterLink} to={`/${RoutesConfig.signIn}`} children="Already have an account? Sign In" />
				</Grid>
			</Grid>
		</Box>
	);
};
export default SignUpForm;
