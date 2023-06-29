import { Avatar, Box, Grid, Paper, Typography } from '@mui/material';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

import React, { useState } from 'react';
import useSignUp from './mutations/useSignUp';
import { CognitoUser } from '@aws-amplify/auth';
import useConfirmSignUp from './mutations/useConfirmSignUp';
import VerifyEmailForm from './components/VerifyEmailForm';
import SignUpForm from './components/SignUpForm';
import { toast } from 'react-toastify';
import useResendSignUp from './mutations/useResendSignUp';
import { RoutesConfig } from 'config/Routes/routeConfig';
import { useNavigate } from 'react-router-dom';
import useCreateInternalUser from './mutations/useCreateInternalUser';
import { USERNAME_FROM_EMAIL } from 'utils/regex';
import { getTeamId } from 'stores/auth.store';
import useGetCurrentUser from './queries/useGetCurrentUser';

const SignUp: React.FC = () => {
	const navigate = useNavigate();
	const { signUp } = useSignUp();
	const confirmSignUp = useConfirmSignUp();
	const resendSignUp = useResendSignUp();
	const createInternalUser = useCreateInternalUser();
	const { refetchAll, currentUser } = useGetCurrentUser();
	const [userMessage, setUserMessage] = useState<string | undefined>();

	const [userDetails, setUserDetails] = useState<CognitoUser | undefined>();

	const [verifyUserAttrOpen, setValidateUserAttrOpen] = useState(false);

	const handleSignUp = (email: string, password: string) => {
		setUserMessage(undefined);
		signUp.mutate(
			{ email, password },
			{
				onSuccess: (data) => {
					if (!data.userConfirmed) {
						const { userSub } = data;
						setUserDetails(data.user);
						setValidateUserAttrOpen(true);

						//FIXME: What if this fails? Need to figure out a solution at a later stage
						createInternalUser.mutate({
							email: email,
							subId: userSub,
							teamName: `${USERNAME_FROM_EMAIL(email)}'s Team`
						});
					}
				},
				onError: (error) => setUserMessage(error.message)
			}
		);
	};

	const handleVerifyEmail = (code: string) => {
		setUserMessage(undefined);
		if (!userDetails) return;
		confirmSignUp.mutate(
			{ code, username: userDetails.getUsername() },
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
		if (!userDetails) return;

		resendSignUp.mutate(userDetails.getUsername(), {
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
				py: { xs: 9, s: 0 }
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
						<ArticleOutlinedIcon />
					</Avatar>

					<Typography variant="h6" textAlign={'center'} color={'error'}>
						{userMessage}
					</Typography>
					{verifyUserAttrOpen ? (
						<VerifyEmailForm onResendCode={handlResendCode} onVerifyUser={handleVerifyEmail} />
					) : (
						<SignUpForm onSignUp={handleSignUp} />
					)}
				</Box>
			</Grid>
		</Grid>
	);
};
export default SignUp;
