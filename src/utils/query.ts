import type { Predicate } from 'utils/types';

export class Query {
    private constructor() {}

    public static and =
        <T>(...fns: Predicate<T>[]) =>
        (value: T) =>
            fns.every((fn) => fn(value));

    public static equals =
        <T, U>(left: T) =>
        (right: U) =>
            (left as any) === (right as any);

    public static isEmpty = <T extends { length: number }>(value: T) =>
        value.length === 0;

    public static hasSubstring = (substring: string) => (str: string) =>
        str.includes(substring);

    public static or =
        <T>(...fns: Predicate<T>[]) =>
        (value: T) =>
            fns.some((fn) => fn(value));

    public static negate = (value: boolean) => !value;
}
