import { Logger, Hub, HubCapsule } from '@aws-amplify/core';
import { useEffect } from 'react';

const logger = new Logger('Auth-logger');

const listener = (data: HubCapsule) => {
	switch (data.payload.event) {
		case 'configured':
			logger.info('the Auth module is configured');
			break;
		case 'signIn':
			logger.info('user signed in');
			break;
		case 'signIn_failure':
			logger.error('user sign in failed');
			break;
		case 'signUp':
			logger.info('user signed up');
			break;
		case 'signUp_failure':
			logger.error('user sign up failed');
			break;
		case 'confirmSignUp':
			logger.info('user confirmation successful');
			break;
		case 'completeNewPassword_failure':
			logger.error('user did not complete new password flow');
			break;
		case 'autoSignIn':
			logger.info('auto sign in successful');
			// const user = data.payload.data;
			// Redirect user to dashboard
			// assign user
			break;
		case 'autoSignIn_failure':
			// redirect to sign in page
			logger.error('auto sign in failed');
			break;
		case 'forgotPassword':
			logger.info('password recovery initiated');
			break;
		case 'forgotPassword_failure':
			logger.error('password recovery failed');
			break;
		case 'forgotPasswordSubmit':
			logger.info('password confirmation successful');
			break;
		case 'forgotPasswordSubmit_failure':
			logger.error('password confirmation failed');
			break;
		case 'verify':
			logger.info('TOTP token verification successful');
			break;
		case 'tokenRefresh':
			logger.info('token refresh succeeded');
			break;
		case 'tokenRefresh_failure':
			logger.error('token refresh failed');
			break;
		case 'cognitoHostedUI':
			logger.info('Cognito Hosted UI sign in successful');
			break;
		case 'cognitoHostedUI_failure':
			logger.error('Cognito Hosted UI sign in failed');
			break;
		case 'customOAuthState':
			logger.info('custom state returned from CognitoHosted UI');
			break;
		case 'customState_failure':
			logger.error('custom state failure');
			break;
		case 'parsingCallbackUrl':
			logger.info('Cognito Hosted UI OAuth url parsing initiated');
			break;
		case 'userDeleted':
			logger.info('user deletion successful');
			break;
		case 'updateUserAttributes':
			// console.log(data.payload.data);
			logger.info('user attributes update successful');
			// Handle verify new user attr

			// {
			//     'email': {
			//       isUpdated: false // indicates that attribute requires verification
			//       codeDeliveryDetails: {
			//         AttributeName: 'email',
			//         DeliveryMedium: 'EMAIL',
			//         Destination: 'm***@a...'
			//       }
			//     },
			//     'family_name': {
			//       isUpdated: true
			//     }
			//   }
			break;
		case 'updateUserAttributes_failure':
			logger.info('user attributes update failed');
			break;
		case 'signOut':
			logger.info('user signed out');
			break;
	}
};

const useLogger = () => {
	useEffect(() => {
		const hubListenerCancelToken = Hub.listen('auth', listener);
		return () => hubListenerCancelToken();
	}, []);
};

export default useLogger;
