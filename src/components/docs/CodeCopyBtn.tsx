import { ContentCopy, Check } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import React, { useEffect } from 'react';

const CodeCopyBtn: React.FC<{ children: React.ReactNode[] & React.ReactNode }> = ({ children }) => {
	const [userInteractions, setUserIneractions] = React.useState({ clicked: false });
	const handleClick = () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		navigator.clipboard.writeText(children && children.length && children[0].props.children[0]);
		setUserIneractions({ clicked: true });
	};

	useEffect(() => {
		const timeout: NodeJS.Timeout = setTimeout(() => {
			setUserIneractions({ clicked: false });
		}, 2000);

		return () => clearTimeout(timeout);
	}, [userInteractions]);

	return (
		<Grid container justifyContent={'flex-end'} height={0}>
			<IconButton sx={{ p: 2 }} onClick={handleClick} color="primary">
				{userInteractions.clicked ? <Check /> : <ContentCopy />}
			</IconButton>
		</Grid>
	);
};
export default CodeCopyBtn;
