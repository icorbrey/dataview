import { None, Option, Some } from './option';

type ResultState<T, E> = { isOk: true; value: T } | { isOk: false; error: E };

export class Result<T, E> {
    private m: ResultState<T, E>;
    private constructor(m: ResultState<T, E>) {
        this.m = m;
    }

    public static Ok<T, E>(value: T): Result<T, E> {
        return new Result({
            isOk: true,
            value,
        });
    }

    public static Err<T, E>(error: E): Result<T, E> {
        return new Result({
            isOk: false,
            error,
        });
    }

    public isOk(): boolean {
        return this.m.isOk === true;
    }

    public isOkAnd(fn: (value: T) => boolean): boolean {
        return this.m.isOk && fn(this.m.value);
    }

    public isErr(): boolean {
        return this.m.isOk === false;
    }

    public isErrAnd(fn: (error: E) => boolean): boolean {
        return this.m.isOk === false && fn(this.m.error);
    }

    public ok(): Option<T> {
        if (this.m.isOk === true) {
            return Some(this.m.value);
        }

        return None();
    }

    public err(): Option<E> {
        if (this.m.isOk === false) {
            return Some(this.m.error);
        }

        return None();
    }

    public map<U>(fn: (value: T) => U): Result<U, E> {
        if (this.m.isOk === true) {
            return Ok(fn(this.m.value));
        }

        return Err(this.m.error);
    }

    public mapOr<U>(value: U, fn: (value: T) => U): U {
        if (this.m.isOk === true) {
            fn(this.m.value);
        }

        return value;
    }

    public mapOrElse<U>(errFn: (error: E) => U, fn: (value: T) => U): U {
        if (this.m.isOk === true) {
            return fn(this.m.value);
        }

        return errFn(this.m.error);
    }

    public mapErr<F>(fn: (error: E) => F): Result<T, F> {
        if (this.m.isOk === false) {
            return Err(fn(this.m.error));
        }

        return Ok(this.m.value);
    }

    public inspect(fn: (value: T) => void): Result<T, E> {
        if (this.m.isOk === true) {
            fn(this.m.value);
        }

        return this;
    }

    public inspectErr(fn: (error: E) => void): Result<T, E> {
        if (this.m.isOk === false) {
            fn(this.m.error);
        }

        return this;
    }

    public expect(message: string): T {
        if (this.m.isOk === true) {
            return this.m.value;
        }

        throw new Error(`${message}: ${this.m.error}`);
    }

    public unwrap(): T {
        if (this.m.isOk === true) {
            return this.m.value;
        }

        throw new Error(this.m.error as any);
    }

    public expectErr(message: string): E {
        if (this.m.isOk === false) {
            return this.m.error;
        }

        throw new Error(`${message}: ${this.m.value}`);
    }

    public unwrapErr(): E {
        if (this.m.isOk === false) {
            return this.m.error;
        }

        throw new Error(this.m.value as any);
    }

    public and<U>(other: Result<U, E>): Result<U, E> {
        if (this.m.isOk === true) {
            return other;
        }

        return Err(this.m.error);
    }

    public andThen<U>(fn: (value: T) => Result<U, E>): Result<U, E> {
        if (this.m.isOk === true) {
            return fn(this.m.value);
        }

        return Err(this.m.error);
    }

    public or<F>(other: Result<T, F>): Result<T, F> {
        if (this.m.isOk === true) {
            return Ok(this.m.value);
        }

        return other;
    }

    public orElse<F>(fn: (error: E) => Result<T, F>): Result<T, F> {
        if (this.m.isOk === true) {
            return Ok(this.m.value);
        }

        return fn(this.m.error);
    }

    public unwrapOr(value: T): T {
        if (this.m.isOk === true) {
            return this.m.value;
        }

        return value;
    }

    public unwrapOrElse(fn: (error: E) => T): T {
        if (this.m.isOk === true) {
            return this.m.value;
        }

        return fn(this.m.error);
    }

    public transpose<U extends T extends Option<infer A> ? A : never>(): Option<
        Result<U, E>
    > {
        if (this.m.isOk === true) {
            return (this.m.value as Option<U>).map((x) => Ok<U, E>(x));
        }

        return Some(Err(this.m.error));
    }

    public flatten<
        U extends T extends Result<infer A, unknown> ? A : never,
    >(): Result<U, E> {
        if (this.m.isOk === true) {
            return this.m.value as Result<U, E>;
        }

        return Err(this.m.error);
    }
}

export const Ok = Result.Ok;
export const Err = Result.Err;
