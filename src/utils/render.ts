import type { DataArray } from 'obsidian-dataview/lib/api/data-array';
import { Markdown, type CalloutSettings } from 'utils/markdown';
import type { Link } from '../models/link';
import type { RegistryEntries } from '..';

export class Render {
    private constructor() {}

    public static callout = (settings: CalloutSettings) =>
        Render.paragraph(Markdown.callout(settings));

    public static link = (link: Link, display?: string) =>
        Render.span(Markdown.link(link.path, display));

    public static list = <T = any>(
        items: T[] | DataArray<T>,
        showIfEmpty = true,
    ) => (0 < items.length || showIfEmpty ? dv.list(items) : undefined);

    public static paragraph = (text: string) => dv.paragraph(text);

    public static span = (text: string) => dv.span(text);

    public static table = (
        columns: string[],
        rows: string[][] | DataArray<string[]>,
        showIfEmpty = true,
    ) => (0 < rows.length || showIfEmpty ? dv.table(columns, rows) : undefined);

    public static taskList = (
        tasks: DataArray<any>,
        showIfEmpty = true,
        groupByFile = false,
    ) =>
        0 < tasks.length || showIfEmpty
            ? dv.taskList(tasks, groupByFile)
            : undefined;

    public static view = (id: RegistryEntries): string =>
        `\`$= dv.view('views/view', ['${id}'])\``;
}
