import { Auth } from '@aws-amplify/auth';

/**
 *
 * @description Unused for now
 */
const useDeleteUserAttr = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const deleteUserAttributes = async (attr: any) => {
		const user = await Auth.currentAuthenticatedUser();

		try {
			const data = await Auth.deleteUserAttributes(user, attr);
			console.log(data);
		} catch (e) {
			console.log(e);
		}
	};

	return {
		mutateAsync: deleteUserAttributes
	};
};
export default useDeleteUserAttr;
