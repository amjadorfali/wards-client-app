import { ClickAwayListener, Tooltip, IconButton } from '@mui/material';
import React from 'react';
import InfoIcon from '@mui/icons-material/Info';
const CustomToolTip: React.FC<{ title: React.ReactNode }> = ({ title }) => {
	const [open, setOpen] = React.useState<boolean | undefined>(false);

	const handleTooltipClose = () => {
		setOpen(false);
	};

	const handleTooltipOpen = () => {
		setOpen(!open);
	};

	return (
		<ClickAwayListener onClickAway={handleTooltipClose}>
			<div>
				<Tooltip
					PopperProps={{
						disablePortal: true
					}}
					onClose={handleTooltipClose}
					open={open}
					title={title}
					// slotProps={{ tooltip: { sx: { color: 'text' } } }}
					placement="bottom"
					disableFocusListener
					disableHoverListener
					disableTouchListener
				>
					<IconButton onClick={handleTooltipOpen} children={<InfoIcon width="1.5rem" height="1.5rem" color="primary" />} />
				</Tooltip>
			</div>
		</ClickAwayListener>
	);
};

export default CustomToolTip;
