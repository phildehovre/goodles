import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

export const getNextDayOfWeek = (targetDayOfWeek: number) => {
    const todayObj = dayjs('YYYY-MM-DD');
    const targetDayOfWeekObj = dayjs().day(targetDayOfWeek);
    const daysUntilTargetDayOfWeek = targetDayOfWeekObj.diff(todayObj, 'day');

    if (daysUntilTargetDayOfWeek <= 0) {
        targetDayOfWeekObj.add(7, 'day');
    }
    return targetDayOfWeekObj.format('ddd YYYY-MM-DD');
}