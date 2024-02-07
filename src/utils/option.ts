import { Err, Ok, Result } from './result';

type OptionState<T> = { isSome: true; value: T } | { isSome: false };

export class Option<T> {
    private m: OptionState<T>;
    private constructor(m: OptionState<T>) {
        this.m = m;
    }

    public static Some<T>(value: T): Option<T> {
        if (value === undefined || value === null) {
            throw new Error(
                'Cannot initialize Some value with undefined or null.',
            );
        }

        return new Option<T>({
            isSome: true,
            value,
        });
    }

    public static None<T>(): Option<T> {
        return new Option<T>({
            isSome: false,
        });
    }

    public isSome(): boolean {
        return this.m.isSome === true;
    }

    public isSomeAnd(fn: (value: T) => boolean): boolean {
        return this.m.isSome === true && fn(this.m.value);
    }

    public isNone(): boolean {
        return this.m.isSome === false;
    }

    public expect(message: string): T {
        if (this.m.isSome === true) {
            return this.m.value;
        }

        throw new Error(message);
    }

    public static expect =
        <T>(message: string) =>
        (option: Option<T>) =>
            option.expect(message);

    public unwrap(): T {
        return this.expect('Option was None');
    }

    public unwrapOr(value: T): T {
        if (this.m.isSome === true) {
            return this.m.value;
        }

        return value;
    }

    public static unwrapOr =
        <T>(value: T) =>
        (option: Option<T>) =>
            option.unwrapOr(value);

    public unwrapOrElse(fn: () => T): T {
        if (this.m.isSome === true) {
            return this.m.value;
        }

        return fn();
    }

    public map<U>(fn: (value: T) => U): Option<U> {
        if (this.m.isSome === true) {
            return Some(fn(this.m.value));
        }

        return None();
    }

    public inspect(fn: (value: T) => void): Option<T> {
        if (this.m.isSome === true) {
            fn(this.m.value);
        }

        return this;
    }

    public mapOr<U>(value: U, fn: (value: T) => U): U {
        if (this.m.isSome === true) {
            return fn(this.m.value);
        }

        return value;
    }

    public static mapOr =
        <T, U>(value: U, fn: (value: T) => U) =>
        (option: Option<T>) =>
            option.mapOr(value, fn);

    public mapOrElse<U>(valueFn: () => U, fn: (value: T) => U): U {
        if (this.m.isSome === true) {
            return fn(this.m.value);
        }

        return valueFn();
    }

    public okOr<E>(error: E): Result<T, E> {
        if (this.m.isSome === true) {
            return Ok(this.m.value);
        }

        return Err(error);
    }

    public okOrElse<E>(fn: () => E): Result<T, E> {
        if (this.m.isSome === true) {
            return Ok(this.m.value);
        }

        return Err(fn());
    }

    public and<U>(other: Option<U>): Option<U> {
        if (this.m.isSome === true) {
            return other;
        }

        return None();
    }

    public andThen<U>(fn: (value: T) => Option<U>): Option<U> {
        if (this.m.isSome === true) {
            return fn(this.m.value);
        }

        return None();
    }

    public filter(fn: (value: T) => boolean): Option<T> {
        if (this.m.isSome === true && fn(this.m.value)) {
            return this;
        }

        return None();
    }

    public or(other: Option<T>): Option<T> {
        if (this.m.isSome === true) {
            return this;
        }

        return other;
    }

    public orElse(fn: () => Option<T>): Option<T> {
        if (this.m.isSome === true) {
            return this;
        }

        return fn();
    }

    public xor(other: Option<T>): Option<T> {
        if (this.m.isSome === true && other.m.isSome === false) {
            return this;
        }

        if (this.m.isSome === false && other.m.isSome === true) {
            return other;
        }

        return None();
    }

    public zip<U>(other: Option<U>): Option<[T, U]> {
        if (this.m.isSome === true && other.m.isSome === true) {
            return Some([this.m.value, other.m.value]);
        }

        return None();
    }

    public zipWith<U, F extends (t: T, u: U) => any>(
        other: Option<U>,
        fn: F,
    ): Option<F extends (t: T, u: U) => infer R ? R : never> {
        if (this.m.isSome === true && other.m.isSome === true) {
            return Some(fn(this.m.value, other.m.value));
        }

        return None();
    }

    public unzip<
        U extends T extends [infer A, unknown] ? A : never,
        V extends T extends [unknown, infer A] ? A : never,
    >(): [Option<U>, Option<V>] {
        if (this.m.isSome === true) {
            const [u, v] = this.m.value as [U, V];
            return [Some(u), Some(v)];
        }

        return [None(), None()];
    }

    public transpose<
        U extends T extends Result<infer A, unknown> ? A : never,
        E extends T extends Result<unknown, infer A> ? A : never,
    >(): Result<Option<U>, E> {
        if (this.m.isSome === true) {
            return (this.m.value as Result<U, E>).map((x) => Some(x));
        }

        return Ok(None());
    }

    public flatten<
        U extends T extends Option<infer U> ? U : never,
    >(): Option<U> {
        if (this.m.isSome === true) {
            return this.m.value as Option<U>;
        }

        return None();
    }
}

export const Some = Option.Some;
export const None = Option.None;
