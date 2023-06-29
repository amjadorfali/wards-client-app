export const PASSWORD =
	/^(?!\s+)(?!.*\s+$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$^*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ])[A-Za-z0-9$^*.[\]{}()?"!@#%&/\\,><':;|_~`=+\- ]{8,256}$/;

export const USERNAME_FROM_EMAIL = (email: string) =>
	email
		.split('@')[0]
		.split(/^([^@]+?)[^a-zA-Z0-9_\-+~!]+/)
		.join(' ');
