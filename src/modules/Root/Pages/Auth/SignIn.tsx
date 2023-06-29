import React, { useState } from 'react';
import { Grid, Link, Button, Avatar, Box, Paper, Typography } from '@mui/material';

import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import useSignIn from './mutations/useSignIn';
import { RoutesConfig } from 'config/Routes/routeConfig';
import useForgotPassword from './mutations/useForgotPassword';
import SignInForm from './components/SignInForm';
import ForgetPasswordForm from './components/ForgetPasswordForm';
import VerifyEmailForm from './components/VerifyEmailForm';
import useConfirmSignUp from './mutations/useConfirmSignUp';
import useResendSignUp from './mutations/useResendSignUp';
import { toast } from 'react-toastify';
import { getTeamId } from 'stores/auth.store';
import useGetCurrentUser from './queries/useGetCurrentUser';

const SignIn: React.FC = () => {
	const signIn = useSignIn();
	const forgetPassword = useForgotPassword();
	const confirmSignUp = useConfirmSignUp();
	const resendSignUp = useResendSignUp();
	const { refetchAll, currentUser } = useGetCurrentUser();
	const navigate = useNavigate();
	const [forgotPassword, setForgotPassword] = useState(false);
	const [userToConfirm, setUserToConfirm] = useState<string | undefined>();
	const [userMessage, setUserMessage] = useState<string | undefined>();

	const handleSignIn = (email: string, password: string) => {
		setUserMessage(undefined);
		signIn.mutate(
			{ password, username: email },
			{
				onSuccess: async () => {
					await refetchAll();
					navigate(`${RoutesConfig.dashboard}/${RoutesConfig.dashboardTeam}/${getTeamId(currentUser)}`, { replace: true });
				},
				onError: (error) => {
					setUserMessage(error.message);

					if (error.name === 'UserNotConfirmedException') {
						setUserToConfirm(email);
					}
				}
			}
		);
	};
	const handleForgetPassword = (email: string) => {
		setUserMessage(undefined);

		forgetPassword.forgotPasswordMutation.mutate(email, {
			onError: (error) => {
				setUserMessage(error.message);
			},
			onSuccess: () => {
				toast('Please check your email for the verification code.');
			}
		});
	};

	const handleForgetPasswordSubmit = (code: string, email: string, password: string) => {
		setUserMessage(undefined);

		forgetPassword.forgotPasswordSubmitMutation.mutate(
			{
				code,
				newPassword: password,
				username: email
			},
			{
				onError: (error) => {
					setUserMessage(error.message);
				},
				onSuccess: () => handleSignIn(email, password)
			}
		);
	};

	const handleVerifyEmail = (code: string) => {
		setUserMessage(undefined);
		if (!userToConfirm) return;
		confirmSignUp.mutate(
			{ code, username: userToConfirm },
			{
				onSuccess: async () => {
					await refetchAll();
					navigate(`${RoutesConfig.dashboard}/${RoutesConfig.dashboardTeam}/${getTeamId(currentUser)}`, { replace: true });
				},
				onError: (error) => {
					setUserMessage(error.message);
				}
			}
		);
	};

	const handlResendCode = () => {
		setUserMessage(undefined);
		if (!userToConfirm) return;

		resendSignUp.mutate(userToConfirm, {
			onSuccess: () => {
				toast('Code resent successfully');
			},
			onError: (error) => {
				setUserMessage(error.message);
			}
		});
	};

	return (
		<Grid
			container
			sx={{
				minHeight: { xs: '90%', sm: '100%' },
				position: 'relative',
				alignContent: 'center',
				justifyContent: 'center',
				py: { xs: 10, s: 0 }
			}}
		>
			<Grid item xs={11} sm={8} md={5} lg={4} xl={3} component={Paper} elevation={6}>
				<Box
					sx={{
						my: 8,
						mx: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOpenOutlinedIcon />
					</Avatar>

					<Typography variant="h6" textAlign={'center'} color={'error'}>
						{userMessage}
					</Typography>
					{forgotPassword ? (
						<ForgetPasswordForm
							onResendCode={handleForgetPassword}
							onForgetPassword={handleForgetPassword}
							onForgetPasswordSubmit={handleForgetPasswordSubmit}
						/>
					) : userToConfirm ? (
						<VerifyEmailForm onResendCode={handlResendCode} onVerifyUser={handleVerifyEmail} />
					) : (
						<>
							<SignInForm onSignIn={handleSignIn} />
							<Button onClick={() => setForgotPassword(true)}>Forget password</Button>
							<Grid item>
								<Link component={RouterLink} to={`/${RoutesConfig.signUp}`} children="Need an account? Sign Up" />
							</Grid>
						</>
					)}
				</Box>
			</Grid>
		</Grid>
	);
};
export default SignIn;
