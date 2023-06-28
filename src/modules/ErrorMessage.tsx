import React from 'react';
const ErrorMessage: React.FC = () => {
	// TODO: Make this better
	return (
		<>
			<h1>Oops something went wrong, please try accessing this page again shortly.</h1>
			<h3>
				If this problem persists, please contact us on <a href="mailto:remote.ops.general@gmail.com">remote.ops.general@gmail.com</a>
			</h3>
		</>
	);
};

export default ErrorMessage;
