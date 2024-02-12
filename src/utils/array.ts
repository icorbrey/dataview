import type { Predicate } from 'utils/types';

class _Array {
    private constructor() {}

    public static append =
        <T>(value: T) =>
        (array: T[]) => [...array, value];

    public static prepend =
        <T>(value: T) =>
        (array: T[]) => [value, ...array];

    public static every =
        <T>(fn: Predicate<T>) =>
        (array: T[]) =>
            array.every(fn);

    public static filter =
        <T>(fn: Predicate<T>) =>
        (array: T[]) =>
            array.filter(fn);

    public static join =
        <T>(separator?: string) =>
        (array: T[]) =>
            array.join(separator);

    public static map =
        <T, U>(fn: (value: T) => U) =>
        (array: T[]) =>
            array.map(fn);

    public static normalize = <T>(value: T | T[]) =>
        Array.isArray(value) ? value : [value];

    public static some =
        <T>(fn: Predicate<T>) =>
        (array: T[]) =>
            array.some(fn);

    public static toDefined = <T>(array: T[]) =>
        _Array.filter<T>((x) => x !== undefined)(array);

    public static toDistinct = <T>(array: T[]) => [...new Set(array)];
}

export { _Array as Array };
