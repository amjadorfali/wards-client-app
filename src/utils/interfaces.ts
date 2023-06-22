export interface User {
	//Username is the subId of the user in cognito
	username: string;
	attributes: {
		email: string;
		phoneNumber?: string;
	};
}
