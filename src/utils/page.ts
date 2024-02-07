import { None, Some, Option } from 'utils/option';
import { Query } from './query';
import { pipe } from './func';

export type Link = Record<string, any>;

export class Page {
    private constructor() {}

    public static current = dv.current();

    public static property =
        <T>(keyPath: string) =>
        (page: Link): Option<T> => {
            const value = keyPath
                .split('.')
                .reduce((obj, key) => (obj && obj[key]) || undefined, page);

            return value !== undefined ? Some(value) : None();
        };

    public static filePath = pipe(
        Page.property<string>('file.path'),
        Option.expect<string>(
            'File should have had a path. This should never happen.',
        ),
    );

    public static path = pipe(
        Page.property<string>('path'),
        Option.expect<string>(
            'Link should have had a path. This should never happen.',
        ),
    );

    public static isLinkTo = (to: Link) => (from: Link) => {
        const fromPath = Page.path(from);
        const toPath = Page.filePath(to);

        return Query.or(
            Query.equals(fromPath),
            Query.hasSubstring(fromPath),
        )(toPath);
    };

    public static isLinkToCurrentPage = Page.isLinkTo(Page.current);
}
