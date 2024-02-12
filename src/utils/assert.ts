export class Assert {
    private constructor() {}

    public static isDefined = (
        value: unknown,
        message: string = 'Value should have been defined.',
    ) => {
        if (value === undefined || value === null) Assert.fail(message);
    };

    public static fail = (message: string) => {
        console.error(`Error: ${message}`);
        throw new Error(message);
    };
}
