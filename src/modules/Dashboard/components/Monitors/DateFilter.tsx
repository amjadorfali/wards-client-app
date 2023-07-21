import React, { useMemo } from 'react';
import { DateRangePicker, RangeKeyDict } from 'react-date-range';

import DateWrapper, { IDateComponentProps } from './DateSelectorWrapper';
import { format, startOfDay } from 'date-fns';

const formatDateToDisplay = (start: Date = new Date(), end: Date = new Date()) => {
	const formattedStartDate = format(start, 'dd/MM/yyyy');
	const formattedEndDate = format(end, 'dd/MM/yyyy');
	// const endIsToday = isToday(end);
	// const startIsToday = isToday(start);

	// if (endIsToday) {
	// 	if (startIsToday) return 'Today';
	// 	return formatDistanceToNow(start, { addSuffix: true });
	// }
	return formattedStartDate.concat(` - ${formattedEndDate}`);
	// return formatDistanceStrict(start, end, { addSuffix: true });
};
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
				maxDate={new Date()}
				moveRangeOnFirstSelection={false}
				direction="horizontal"
			/>
		</DateWrapper>
	);
};

export default DateFilter;
