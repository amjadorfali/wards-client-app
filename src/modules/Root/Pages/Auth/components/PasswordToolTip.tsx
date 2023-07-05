import { Circle } from '@mui/icons-material';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CustomToolTip from 'components/CustomToolTip';
import React from 'react';
const PasswordToolTip: React.FC = () => {
	return (
		<CustomToolTip
			title={
				<List
					sx={{
						'.MuiListItemText-primary': { fontSize: '1rem' },
						'.MuiSvgIcon-root': { fontSize: '0.5rem' },
						'.MuiListItemIcon-root': { minWidth: '1rem' }
					}}
				>
					<ListItem>
						<ListItemIcon>
							<Circle />
						</ListItemIcon>
						<ListItemText>Contains at least 1 number</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemIcon>
							<Circle />
						</ListItemIcon>
						<ListItemText>Contains at least 1 special character</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemIcon>
							<Circle />
						</ListItemIcon>
						<ListItemText>Contains at least 1 uppercase letter</ListItemText>
					</ListItem>
					<ListItem>
						<ListItemIcon>
							<Circle />
						</ListItemIcon>
						<ListItemText>Contains at least 1 lowercase letter</ListItemText>
					</ListItem>
				</List>
			}
		/>
	);
};
export default PasswordToolTip;
