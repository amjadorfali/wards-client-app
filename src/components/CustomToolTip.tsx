import { ClickAwayListener, Tooltip, IconButton, tooltipClasses, styled } from '@mui/material';
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
			<StyledToolTip>
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
			</StyledToolTip>
		</ClickAwayListener>
	);
};

export default CustomToolTip;

const StyledToolTip = styled('div')`
	/* .${tooltipClasses.popper} {
		padding-bottom: 0.3rem;
		max-width: 8rem;
		min-width: 1rem;
	}
	.${tooltipClasses.arrow} {
		color: var(--body-color);
	}
	.${tooltipClasses.tooltip} {
		background-color: var(--body-color);
		color: var(--header-color);
		font-size: 1rem;
	} */
`;
