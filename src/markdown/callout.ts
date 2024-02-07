import { Option } from 'utils/option';
import { String } from 'utils/string';
import { Array } from 'utils/array';
import { pipe } from 'utils/func';

type CalloutModifier = 'static' | 'open' | 'closed';

export type CalloutSettings = {
    modifier: CalloutModifier;
    content: Option<string>;
    header: string;
    type: string;
};

const modifierMap: { [Key in CalloutModifier]: string } = {
    closed: '-',
    static: '',
    open: '+',
};

export const callout = (settings: CalloutSettings) =>
    assemble([header(settings), content(settings.content)]);

const header = ({ type, modifier, header }: CalloutSettings) =>
    `> [!${type}]${modifierMap[modifier]} ${header}`;

const content = pipe(Option.mapOr([], String.split('\n')));

const assemble = pipe(Array.toDefined, Array.join('\n> '));
