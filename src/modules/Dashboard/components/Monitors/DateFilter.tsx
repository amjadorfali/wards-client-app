import React, { useMemo } from 'react';
import { DateRangePicker, RangeKeyDict } from 'react-date-range';

import DateWrapper, { formatDateToDisplay, IDateComponentProps } from './DateSelectorWrapper';
import { startOfDay } from 'date-fns';

const DateFilter: React.FC<IDateComponentProps> = ({
	selectedDates,
	title,
	onDateSelect = () => console.log(),
	onFocus = () => console.log()
}) => {
	const handleDateSelect = (data: RangeKeyDict) => {
		const ranges = { ...data };
		const start = startOfDay(ranges.selection.startDate || new Date());
		const end = startOfDay(ranges.selection.endDate || new Date());
		if (start && end) {
			onDateSelect({ start, end });
		}
	};

	const formattedDates = useMemo(
		() => formatDateToDisplay(selectedDates?.start, selectedDates?.end),
		[selectedDates?.start, selectedDates?.end]
	);
	return (
		<DateWrapper title={formattedDates ? formattedDates : title} onFocus={onFocus}>
			<DateRangePicker
				onChange={handleDateSelect}
				ranges={[
					{
						startDate: selectedDates?.start,
						endDate: selectedDates?.end,
						key: 'selection'
					}
				]}
				moveRangeOnFirstSelection={false}
				direction="horizontal"
			/>
		</DateWrapper>
	);
};

export default DateFilter;
