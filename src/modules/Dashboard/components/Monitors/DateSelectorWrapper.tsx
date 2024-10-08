import React from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from '@mui/icons-material';
import { Button, Menu, styled } from '@mui/material';
import { DateFilter } from 'utils/interfaces';

export interface IDateComponentProps {
	selectedDates?: DateFilter;
	title: string;
	onFocus?: () => void;
	onDateSelect?: (date: { start: Date; end: Date }) => void;
}

export interface IDateWrapper {
	title: string;
	onFocus: () => void;
}
const DateWrapper: React.FC<React.PropsWithChildren<IDateWrapper>> = ({ title, children, onFocus }) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
		onFocus();
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Button
				startIcon={
					<IconWrapper sx={{ width: '3rem', height: '3rem' }}>
						<DateRange />
					</IconWrapper>
				}
				aria-label="account of current user"
				aria-controls="menu-appbar"
				aria-haspopup="true"
				onClick={handleMenu}
				variant="outlined"
				color="secondary"
			>
				<span> {title}</span>
			</Button>
			<Menu
				id="menu-appbar"
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left'
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center'
				}}
				open={!!anchorEl}
				onClose={handleClose}
				slotProps={{ paper: { sx: { overflow: 'auto' } } }}
			>
				{children}
			</Menu>
		</>
	);
};

export default DateWrapper;

const IconWrapper = styled('div')`
	display: flex;
	align-items: center;
	justify-content: center;
`;
