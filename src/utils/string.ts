export class String {
    private constructor() {}

    public static split =
        (separator: string | RegExp, limit?: number) => (value: string) =>
            value.split(separator, limit);
}
