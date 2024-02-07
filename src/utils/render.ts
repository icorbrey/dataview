import type { DataArray } from 'obsidian-dataview/lib/api/data-array';
import { callout, type CalloutSettings } from 'markdown/callout';
import { link as _link } from 'markdown/link';
import type { Link } from 'utils/page';

export class Render {
    private constructor() {}

    public static callout = (settings: CalloutSettings) =>
        Render.paragraph(callout(settings));

    public static link = (link: Link, text: string) =>
        Render.span(_link(link, text));

    public static list = <T = any>(items: T[] | DataArray<T>) =>
        0 < items.length ? dv.list(items) : undefined;

    public static paragraph = (text: string) => dv.paragraph(text);

    public static span = (text: string) => dv.span(text);

    public static table = (
        columns: string[],
        rows: string[][] | DataArray<string[]>,
    ) => (0 < rows.length ? dv.table(columns, rows) : undefined);

    public static view = (id: string): string =>
        `\`$= dv.view('views/view', ['${id}'])\``;
}
