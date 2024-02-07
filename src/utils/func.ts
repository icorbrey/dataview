type Final<T> = T extends [...unknown[], infer LastItem] ? LastItem : never;

type Function<A, B> = (value: A) => B;
type ReturnValue<T> = T extends Function<any, infer B> ? B : never;

type PipeFunctions<Fns extends unknown[], I> = Fns extends [
    infer Head,
    ...infer Tail,
]
    ? [
          Function<I, ReturnValue<Head>>,
          ...PipeFunctions<Tail, ReturnValue<Head>>,
      ]
    : Fns;

type PipeFunctionsOutput<Fns extends unknown[]> = ReturnValue<Final<Fns>>;

export const pipe =
    <I, Fns extends unknown[]>(...fns: PipeFunctions<Fns, I>) =>
    (input: I): PipeFunctionsOutput<Fns> =>
        fns.reduce((acc, fn) => (fn as any)(acc), input) as any;
