import { Some, Option, None } from 'utils/option';
import type { Link } from 'utils/page';
import { DateTime } from 'utils/luxon';
import { Query } from 'utils/query';
import { pipe } from 'utils/func';

export type TaskObj = Record<string, any>;

export class Task {
    private constructor() {}

    public static property =
        <T>(keyPath: string) =>
        (task: TaskObj): Option<T> => {
            const value = keyPath
                .split('.')
                .reduce((obj, key) => (obj && obj[key]) || undefined, task);

            return value !== undefined ? Some(value) : None();
        };

    public static text = pipe(Task.property('text'), Option.unwrapOr(''));
    public static completedOn = Task.property<DateTime>('completion');
    public static section = Task.property<string>('section.subpath');
    public static dueOn = Task.property<DateTime>('due');

    public static outlinks = pipe(
        Task.property<Link[]>('outlinks'),
        Option.unwrapOr<Link[]>([]),
    );

    public static isComplete = pipe(
        Task.property<boolean>('completed'),
        Option.unwrapOr(false),
    );

    public static isInSection = (section: string) =>
        pipe(
            Task.section,
            Option.unwrapOr(''),
            Query.or(Query.equals(section), Query.hasSubstring(section)),
        );

    public static isIncomplete = pipe(Task.isComplete, Query.negate);
    public static isEmpty = pipe(Task.text, Query.isEmpty);

    public static hasText = pipe(Task.isEmpty, Query.negate);
}
