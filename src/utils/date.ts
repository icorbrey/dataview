import { None, Some, type Option } from 'utils/option';
import type { DateTimeUnit, DurationLike } from 'luxon';
import { DateTime } from 'utils/luxon';

export class Date {
    private constructor() {}

    public static fromIsoString = (text: string): Option<DateTime> => {
        const date = DateTime.fromISO(text);
        return date.isValid ? Some(date) : None();
    };

    public static today = () => DateTime.now();

    public static hasSame =
        (mark: DateTime, unit: DateTimeUnit) => (date: DateTime) =>
            date.hasSame(mark, unit);

    public static isToday = Date.hasSame(Date.today(), 'day');

    public static occurredInLast =
        (duration: DurationLike) => (date: DateTime) =>
            Date.today().minus(duration) < date;
}
