import { Array } from './array';
import { None } from './option';
import { Render } from './render';

type RegistryState<T extends { [key: string]: any }> = T;

export class Registry<T extends { [key: string]: any } = {}> {
    private state: RegistryState<T>;

    private constructor(state: RegistryState<T>) {
        this.state = state;
    }

    public static new = () => new Registry({});

    public register = <F, K extends string>(
        key: K,
        fn: F,
    ): Registry<T & { [Key in K]: F }> =>
        new Registry({
            ...this.state,
            [key]: fn,
        });

    public run = (input: any) =>
        Array.normalize(input).map(([key, input]: any) =>
            !!this.state[key]
                ? this.state[key](input)
                : Render.callout({
                      header: `Error: No registered view with ID "${key}".`,
                      modifier: 'static',
                      content: None(),
                      type: 'error',
                  }),
        );
}