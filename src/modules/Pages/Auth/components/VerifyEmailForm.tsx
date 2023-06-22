import { Box, Button } from '@mui/material';
import ControlledTextField from 'components/inputs/ControlledTextfield';
import React from 'react';
import { useForm } from 'react-hook-form';

type VerificationFormValues = {
	code: string;
};
interface Props {
	onVerifyUser: (code: string) => void;
	onResendCode: () => void;
}

const VerifyEmailForm: React.FC<Props> = ({ onVerifyUser, onResendCode }) => {
	const verificationForm = useForm<VerificationFormValues>();

	const onVerifyUserSubmit = (data: VerificationFormValues) => {
		onVerifyUser(data.code);
	};
	return (
		<Box component="form" onSubmit={verificationForm.handleSubmit(onVerifyUserSubmit)} noValidate={false} sx={{ mt: 1 }}>
			<ControlledTextField
				textFieldProps={{
					margin: 'normal',
					fullWidth: true,
					label: 'Verification Code',
					name: 'code',
					InputLabelProps: { required: true },
					sx: { minHeight: '5rem' },
					type: 'text'
				}}
				controller={{
					rules: {
						required: { value: true, message: 'Please enter your Verification Code' }
					},
					defaultValue: '',
					name: 'code'
				}}
				control={verificationForm.control}
			/>

			<Button
				type="submit"
				disabled={!!Object.keys(verificationForm.formState.errors).length}
				fullWidth
				variant="contained"
				sx={{ mt: 3, mb: 2 }}
			>
				Verify code
			</Button>

			<Button onClick={onResendCode} fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
				Resend Code
			</Button>
		</Box>
	);
};

export default VerifyEmailForm;
