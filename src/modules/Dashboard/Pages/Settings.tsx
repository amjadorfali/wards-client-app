import React, { useState } from 'react';
import { Box, Button, Grid, IconButton, InputAdornment, Modal, Paper, SxProps, Theme, Typography } from '@mui/material';
import ControlledTextField from 'components/inputs/ControlledTextfield';
import { useForm } from 'react-hook-form';
import useGetCurrentUser from 'modules/Root/Pages/Auth/queries/useGetCurrentUser';
import { toast } from 'react-toastify';
import useChangePassword from 'modules/Root/Pages/Auth/mutations/useChangePassword';
import { PASSWORD } from 'utils/regex';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PasswordToolTip from 'modules/Root/Pages/Auth/components/PasswordToolTip';
import useUpdateUserAttr from 'modules/Root/Pages/Auth/mutations/useUpdateUserAttr';
import useVerifyCurrentUserAttrUpdate from 'modules/Root/Pages/Auth/mutations/useVerifyCurrentUserAttrUpdate';

interface UpdateEmailFormValues {
	email: string;
}

interface UpdatePasswordFormValues {
	oldPassword: string;
	newPassword: string;
}

interface VerifyEmailFormValues {
	code: string;
}

const ModalBoxStyles: SxProps<Theme> = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: { xs: 6, sm: 4 }
};

const Settings: React.FC = () => {
	const { currentUser } = useGetCurrentUser();
	const updateEmailForm = useForm<UpdateEmailFormValues>();
	const updatePasswordForm = useForm<UpdatePasswordFormValues>({ shouldUnregister: true });
	const verifyEmailForm = useForm<VerifyEmailFormValues>({ shouldUnregister: true });

	const updateEmail = useUpdateUserAttr();
	const { verifyCurrentUserAttribute, verifyCurrentUserAttributeSubmit } = useVerifyCurrentUserAttrUpdate('email');
	const changePassword = useChangePassword();

	const [showPassword, setShowPassword] = useState(false);
	const [verifyEmailOpen, setVerifyEmailOpen] = useState(false);

	const toggleShowPassword = () => setShowPassword(!showPassword);
	const handleSubmitEmail = (data: UpdateEmailFormValues) => {
		if (data.email === currentUser.attributes?.email) return toast('Email is the same as the current one');
		updateEmail.mutate(
			{ email: data.email },
			{
				onSuccess: () => setVerifyEmailOpen(true),
				onError: (error) => toast(error.message, { type: 'error' })
			}
		);
	};

	const handleSubmitPassword = ({ newPassword, oldPassword }: UpdatePasswordFormValues) => {
		changePassword.mutate(
			{ newPassword, oldPassword },
			{
				onSuccess: () => {
					updatePasswordForm.reset();
					toast('Password changed successfully', { type: 'success' });
				},
				onError: (error) => toast(error.message, { type: 'error' })
			}
		);
	};

	const handleSubmitVerificationCode = ({ code }: VerifyEmailFormValues) => {
		verifyCurrentUserAttributeSubmit.mutate(code, {
			onSuccess: () => {
				toast('Email changed successfully', { type: 'success' });
				setVerifyEmailOpen(false);
			},
			onError: (error) => toast(error.message, { type: 'error' })
		});
	};

	const handleResendVerificationCode = () => {
		verifyCurrentUserAttribute.mutate(undefined, {
			onSuccess: () => toast('Verification code sent', { type: 'success' }),
			onError: (error) => toast(error.message, { type: 'error' })
		});
	};

	return (
		<>
			<Grid container alignContent={'center'} justifyContent={'center'} sx={{}}>
				<Grid item xs={12}>
					<Typography variant="h2">Your account</Typography>
				</Grid>
				<br />
				<br />
				<br />

				<Grid gap={4} container item xs={12}>
					{/* Account information */}
					<Grid
						container
						item
						sx={{ justifyContent: { lg: 'space-between' } }}
						component={'form'}
						onSubmit={updateEmailForm.handleSubmit(handleSubmitEmail)}
						gap={1}
					>
						<Grid item xs={12} lg={4}>
							<Typography variant="h4">Account information</Typography>
						</Grid>

						<Grid item xs={12} lg={7} gap={2} container justifyContent={'center'} component={Paper} p={2}>
							<Grid item xs={12} sm={8} md={6} container>
								<ControlledTextField
									controller={{
										rules: {
											required: { value: true, message: 'Please enter a valid email' },
											validate: (email) => email !== currentUser.attributes?.email
										},
										defaultValue: currentUser.attributes?.email,
										name: 'email'
									}}
									control={updateEmailForm.control}
									textFieldProps={{
										margin: 'normal',
										name: 'username',
										label: 'Email',
										fullWidth: true,
										InputLabelProps: { required: true },

										type: 'email'
									}}
								/>
							</Grid>

							{/* Submit */}
							<Grid item container xs={12} justifyContent={'center'}>
								<Button
									size="large"
									variant="contained"
									type="submit"
									disabled={!!Object.keys(updateEmailForm.formState.errors).length}
								>
									Save new Email
								</Button>
							</Grid>
						</Grid>
					</Grid>

					{/* Password */}
					<Grid
						container
						item
						sx={{ justifyContent: { lg: 'space-between' } }}
						component={'form'}
						onSubmit={updatePasswordForm.handleSubmit(handleSubmitPassword)}
						gap={1}
					>
						<Grid item xs={12} lg={4}>
							<Typography variant="h4">Password</Typography>
						</Grid>

						<Grid item xs={12} lg={7} gap={1} justifyContent={'center'} container component={Paper} p={2}>
							{/* <!-- user invisible --> */}
							{currentUser.attributes?.email && (
								<input style={{ display: 'none' }} readOnly id="username" type="email" value={currentUser.attributes?.email} />
							)}
							<Grid item xs={12} sm={8} md={6} container justifyContent={'center'}>
								<ControlledTextField
									controller={{
										rules: {
											required: { value: true, message: 'Please enter old password' }
										},

										name: 'oldPassword',
										defaultValue: ''
									}}
									control={updatePasswordForm.control}
									textFieldProps={{
										label: 'Old Password',
										margin: 'normal',
										name: 'oldPassword',
										fullWidth: true,
										autoComplete: 'current-password',
										InputLabelProps: { required: true },
										type: 'password'
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={8} md={6} container justifyContent={'center'}>
								<ControlledTextField
									controller={{
										rules: {
											required: { value: true, message: 'Please enter your new Password' },
											pattern: { value: PASSWORD, message: 'Invalid Password, please check the password requirements' }
										},
										name: 'newPassword',
										defaultValue: ''
									}}
									control={updatePasswordForm.control}
									textFieldProps={{
										margin: 'normal',
										label: 'New Password',
										name: 'newPassword',
										fullWidth: true,

										InputLabelProps: { required: true },
										autoComplete: 'new-password',
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
											),
											startAdornment: <PasswordToolTip />
										}
									}}
								/>
							</Grid>

							{/* Submit */}
							<Grid item container xs={12} mt={2} justifyContent={'center'}>
								<Button
									size="large"
									variant="contained"
									type="submit"
									disabled={!!Object.keys(updatePasswordForm.formState.errors).length}
								>
									Save new Password
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>

			<Modal open={verifyEmailOpen} onClose={() => setVerifyEmailOpen(false)}>
				<Box sx={ModalBoxStyles}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Verify new email{' '}
					</Typography>
					<Grid
						container
						justifyContent={'center'}
						p={2}
						component={'form'}
						onSubmit={verifyEmailForm.handleSubmit(handleSubmitVerificationCode)}
						gap={3}
					>
						<Grid item xs={10} container>
							<ControlledTextField
								controller={{
									rules: {
										required: { value: true, message: 'Please enter a verification code' }
									},
									defaultValue: '',
									name: 'code'
								}}
								control={verifyEmailForm.control}
								textFieldProps={{
									margin: 'normal',
									name: 'code',
									label: 'Verification Code',
									fullWidth: true,
									InputLabelProps: { required: true },
									type: 'text'
								}}
							/>
						</Grid>

						{/* Submit */}
						<Grid item gap={2} container xs={12} justifyContent={'center'} alignContent={'center'}>
							<Grid item xs={10}>
								<Button
									size="large"
									variant="contained"
									type="submit"
									fullWidth
									disabled={!!Object.keys(verifyEmailForm.formState.errors).length}
								>
									Verify new email
								</Button>
							</Grid>

							<Grid item xs={10}>
								<Button fullWidth size="large" variant="outlined" onClick={handleResendVerificationCode}>
									Resend verification code
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</Modal>
		</>
	);
};
export default Settings;
