import { Box, Button, Grid, IconButton, InputAdornment, Typography, useTheme } from '@mui/material';
import ControlledTextField from 'components/inputs/ControlledTextfield';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link as RouterLink } from 'react-router-dom';
// import useSignUp from './mutations/useSignUp';
import { RoutesConfig } from 'config/Routes/routeConfig';
import { PASSWORD } from 'utils/regex';
import PasswordToolTip from './PasswordToolTip';
type SignUpFormValues = {
	password: string;
	email: string;
};

interface Props {
	onSignUp: (email: string, password: string) => void;
}
const SignUpForm: React.FC<Props> = ({ onSignUp }) => {
	const theme = useTheme();
	const signUpForm = useForm<SignUpFormValues>();
	const [showPassword, setShowPassword] = useState(false);

	const toggleShowPassword = () => setShowPassword(!showPassword);

	const handleSignUpSubmit = (data: SignUpFormValues) => {
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
					name: 'username',
					InputLabelProps: { required: true },
					autoComplete: 'username',
					sx: { minHeight: '5rem' },
					type: 'email'
				}}
				controller={{
					rules: {
						required: { value: true, message: 'Please enter your Email' }

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
						startAdornment: <PasswordToolTip />
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

			<Grid container pt={3}>
				<Grid item>
					<Typography variant="caption">
						By clicking on "SIGN UP", you agree to our{' '}
						<Link
							sx={{ ...theme.typography.caption }}
							component={RouterLink}
							target="_blank"
							to={`/${RoutesConfig.terms}`}
							children="Terms and Conditions"
						/>
						and{' '}
						<Link
							sx={{ ...theme.typography.caption }}
							component={RouterLink}
							target="_blank"
							to={`/${RoutesConfig.privacy}`}
							children="Privacy Policy"
						/>
					</Typography>
				</Grid>
			</Grid>
		</Box>
	);
};
export default SignUpForm;
