import { Err, Ok, type Result } from 'utils/result';
import { Render } from 'utils/render';
import { Array } from 'utils/array';
import { None } from 'utils/option';

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
        Array.normalize(input)
            .map(Array.normalize)
            .map(([key, input]: any) => [
                Object.keys(this.state).includes(key) ? Ok(key) : Err(key),
                input,
            ])
            .map(([view, input]: [Result<keyof T, string>, any]) =>
                view.mapOrElse<any>(
                    this.renderMissingView,
                    this.executeView(input),
                ),
            );

    private executeView = (input: any) => (key: keyof T) => {
        try {
            this.state[key](input);
        } catch (e) {
            console.error(e);
            throw e;
        }
    };

    private renderMissingView = (key: string) =>
        Render.callout({
            header: `Error: No registered view with ID "${key}".`,
            modifier: 'static',
            content: None(),
            type: 'error',
        });
}
