import { Array } from 'utils/array';
import { pipe } from 'utils/func';
import { Option } from './option';
import { String } from './string';

export class Markdown {
    private constructor() {}

    public static callout = (settings: CalloutSettings) =>
        assembleCallout([
            getCalloutHeader(settings),
            getCalloutContent(settings.content),
        ]);

    public static link = (path: string, display?: string) =>
        `[[${pipe(
            Array.toDistinct,
            Array.toDefined,
            Array.join('|'),
        )([path, display])}]]`;
}

export type CalloutModifier = 'static' | 'open' | 'closed';

export type CalloutSettings = {
    modifier: CalloutModifier;
    content: Option<string>;
    header: string;
    type: string;
};

const calloutModifierMap: { [Key in CalloutModifier]: string } = {
    closed: '-',
    static: '',
    open: '+',
};

const getCalloutHeader = ({ type, modifier, header }: CalloutSettings) =>
    `> [!${type}]${calloutModifierMap[modifier]} ${header}`;

const getCalloutContent = pipe(Option.mapOr([], String.split('\n')));

const assembleCallout = pipe(Array.toDefined, Array.join('\n> '));
