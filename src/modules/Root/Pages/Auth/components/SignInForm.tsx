import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, IconButton, InputAdornment } from '@mui/material';
import ControlledTextField from 'components/inputs/ControlledTextfield';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { PASSWORD } from 'utils/regex';

type FormValues = {
	email: string;
	password: string;
};
interface Props {
	onSignIn: (email: string, password: string) => void;
}
const SignInForm: React.FC<Props> = ({ onSignIn }) => {
	const signInForm = useForm<FormValues>({ shouldUnregister: true });
	const [showPassword, setShowPassword] = useState(false);

	const toggleShowPassword = () => setShowPassword(!showPassword);
	const handleSubmit = (data: FormValues) => onSignIn(data.email, data.password);

	return (
		<Box component="form" noValidate={false} onSubmit={signInForm.handleSubmit(handleSubmit)} sx={{ mt: 1 }}>
			<ControlledTextField
				controller={{
					rules: {
						required: { value: true, message: 'Please enter your Email' }
					},
					defaultValue: '',

					name: 'email'
				}}
				control={signInForm.control}
				textFieldProps={{
					margin: 'normal',
					placeholder: 'Enter your email',
					label: 'Email',
					name: 'username',
					fullWidth: true,
					InputLabelProps: {
						required: true
					},
					sx: { minHeight: '5rem' },
					autoComplete: 'username',
					type: 'email'
				}}
			/>
			<ControlledTextField
				textFieldProps={{
					margin: 'normal',
					fullWidth: true,
					label: 'Password',
					name: 'password',
					InputLabelProps: { required: true },
					autoComplete: 'current-password',
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
				control={signInForm.control}
			/>
			<Button
				disabled={!!Object.keys(signInForm.formState.errors).length}
				type="submit"
				fullWidth
				variant="contained"
				sx={{ mt: 3, mb: 2 }}
			>
				Log In
			</Button>
		</Box>
	);
};

export default SignInForm;
