import { Auth, CognitoUser } from '@aws-amplify/auth';
import { AuthError } from '@aws-amplify/auth/lib-esm/Errors';
import { useMutation } from '@tanstack/react-query';

interface SignInProps {
	username: string;
	password: string;
}
const useSignIn = () => {
	return useMutation<CognitoUser, AuthError, SignInProps>({
		mutationFn: ({ password, username }: SignInProps) => Auth.signIn(username, password)
	});
};
export default useSignIn;

/** //TODO Do i need this?
 * https://docs.amplify.aws/lib/auth/manageusers/q/platform/js/#complete-new-password
 */
// Auth.signIn(username, password)
//   .then((user) => {
//     if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
//       const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
//       Auth.completeNewPassword(
//         user, // the Cognito User Object
//         newPassword, // the new password
//         // OPTIONAL, the required attributes
//         {
//           email: 'xxxx@example.com',
//           phone_number: '1234567890'
//         }
//       )
//         .then((user) => {
//           // at this time the user is logged in if no MFA required
//           console.log(user);
//         })
//         .catch((e) => {
//           console.log(e);
//         });
//     } else {
//       // other situations
//     }
//   })
//   .catch((e) => {
//     console.log(e);
//   });
