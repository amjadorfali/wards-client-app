import { endOfDay, format, startOfDay } from 'date-fns';
import { DateFilter } from './interfaces';

export const formatDateFilters = (selectedDates: DateFilter) => {
	return {
		startDate: format(startOfDay(selectedDates.start), 'yyyy-MM-dd HH:mm:ss'),
		endDate: format(endOfDay(selectedDates.end), 'yyyy-MM-dd HH:mm:ss')
	};
};
