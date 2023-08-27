import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import { DialogContentText } from '@mui/material';

export interface ConfirmationDialogRawProps {
	open: boolean;
	onClose: () => void;
	onDelete: () => void;
	monitorName: string;
}

const ConfirmDeleteMonitorDialog: React.FC<ConfirmationDialogRawProps> = ({ onClose, onDelete, open, monitorName }) => {
	return (
		<Dialog sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }} maxWidth="xs" onClose={onClose} open={open}>
			<DialogTitle>Delete Monitor</DialogTitle>
			<DialogContent dividers>
				<DialogContentText>
					Are you sure you want to delete monitor <strong>{monitorName}</strong>?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button size="large" variant="outlined" autoFocus onClick={onClose}>
					Cancel
				</Button>
				<Button size="large" variant="contained" onClick={onDelete}>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmDeleteMonitorDialog;
