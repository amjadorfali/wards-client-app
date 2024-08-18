import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './modules/App.tsx';

// SETUP: Amplify
// import { Amplify } from '@aws-amplify/core';
// import awsExports from './aws-exports';
// Amplify.configure(awsExports);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
