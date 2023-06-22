import React, { BaseSyntheticEvent, useState } from 'react';
import { Box, Button, IconButton, InputAdornment, ListItem, ListItemText, List, ListItemIcon } from '@mui/material';
import ControlledTextField from 'components/inputs/ControlledTextfield';
import { useForm } from 'react-hook-form';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { PASSWORD } from 'utils/regex';
import CustomToolTip from 'components/CustomToolTip';
import { Circle } from '@mui/icons-material';

interface Props {
	onForgetPassword: (email: string) => void;
	onForgetPasswordSubmit: (code: string, username: string, newPassword: string) => void;
	onResendCode: (email: string) => void;
}
const ForgetPasswordForm: React.FC<Props> = ({ onForgetPassword, onForgetPasswordSubmit, onResendCode }) => {
	const [email, setEmail] = useState('');

	const handleVerifyUser = (email: string) => {
		onForgetPassword(email);
		setEmail(email);
	};
	const handleNewPassword = (password: string, code: string) => {
		onForgetPasswordSubmit(code, email, password);
	};

	return !email ? (
		<EnterEmail onVerifyUser={handleVerifyUser} />
	) : (
		<EnterNewPassword onResendCode={() => onResendCode(email)} onEnterNewPassword={handleNewPassword} />
	);
};

export default ForgetPasswordForm;

interface EnterEmailFormValues {
	email: string;
}
interface EnterEmailProps {
	onVerifyUser: (email: string) => void;
}
const EnterEmail: React.FC<EnterEmailProps> = ({ onVerifyUser }) => {
	const enterEmailForm = useForm<EnterEmailFormValues>({ shouldUnregister: true });

	const onVerifyUserSubmit = (data: EnterEmailFormValues, event?: BaseSyntheticEvent<object, unknown, unknown>) => {
		event && event.preventDefault();
		onVerifyUser(data.email);
	};
	return (
		<Box component="form" my={2} onSubmit={enterEmailForm.handleSubmit(onVerifyUserSubmit)}>
			<ControlledTextField
				controller={{
					rules: {
						required: { value: true, message: 'Please enter your Email' }
					},
					defaultValue: '',

					name: 'email'
				}}
				control={enterEmailForm.control}
				textFieldProps={{
					margin: 'normal',
					placeholder: 'Enter your email',
					label: 'Email',
					name: 'email',
					fullWidth: true,
					InputLabelProps: {
						required: true
					},
					sx: { minHeight: '5rem' },
					autoComplete: 'email',
					type: 'email'
				}}
			/>
			<Button
				disabled={!!Object.keys(enterEmailForm.formState.errors).length}
				type="submit"
				fullWidth
				variant="contained"
				sx={{ mt: 3, mb: 2 }}
			>
				Verify Email
			</Button>
		</Box>
	);
};

interface EnterNewPasswordFormValues {
	password: string;
	code: string;
}
interface EnterNewPasswordProps {
	onEnterNewPassword: (password: string, code: string) => void;
	onResendCode: () => void;
}
const EnterNewPassword: React.FC<EnterNewPasswordProps> = ({ onEnterNewPassword, onResendCode }) => {
	const enterNewPasswordForm = useForm<EnterNewPasswordFormValues>({ shouldUnregister: true });
	const [showPassword, setShowPassword] = useState(false);

	const toggleShowPassword = () => setShowPassword(!showPassword);

	const onEnterNewPasswordSubmit = (data: EnterNewPasswordFormValues, event?: BaseSyntheticEvent<object, unknown, unknown>) => {
		event && event.preventDefault();
		onEnterNewPassword(data.password, data.code);
	};

	return (
		<Box component="form" my={2} onSubmit={enterNewPasswordForm.handleSubmit(onEnterNewPasswordSubmit)}>
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
				control={enterNewPasswordForm.control}
			/>

			<ControlledTextField
				controller={{
					rules: {
						required: { value: true, message: 'Please the verification code' }
					},
					defaultValue: '',

					name: 'code'
				}}
				control={enterNewPasswordForm.control}
				textFieldProps={{
					margin: 'normal',
					placeholder: 'Enter the verification code',
					label: 'Code',
					name: 'code',
					fullWidth: true,
					InputLabelProps: {
						required: true
					},
					sx: { minHeight: '5rem' },
					type: 'text'
				}}
			/>

			<Button
				disabled={!!Object.keys(enterNewPasswordForm.formState.errors).length}
				type="submit"
				fullWidth
				variant="contained"
				sx={{ mt: 3, mb: 2 }}
			>
				Submit new password
			</Button>

			<Button fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }} onClick={onResendCode}>
				Resend code
			</Button>
		</Box>
	);
};
