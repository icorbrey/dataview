import { File } from 'models/file';
import { Markdown } from '../utils/markdown';

type PageState<T extends { [key: string]: any }> = {
    aliases: string[];
    tags: string[];
    properties: T;
    file: File;
};

export class Page<T extends { [key: string]: any }> {
    private m: PageState<T>;
    private constructor(m: PageState<T>) {
        this.m = m;
    }

    public static fromRecord = <T extends { [key: string]: any }>(
        page: Record<string, any>,
        fn: (page: Record<string, any>) => T,
    ): Page<T> => {
        return new Page({
            file: File.fromRecord(page.file),
            aliases: page.aliases ?? [],
            tags: page.tags ?? [],
            properties: fn(page),
        });
    };

    public static current = () =>
        Page.fromRecord<any>(dv.current(), () => ({}));

    public static aliases = <T extends { [key: string]: any }>(page: Page<T>) =>
        page.aliases;
    public static file = <T extends { [key: string]: any }>(page: Page<T>) =>
        page.file;
    public static tags = <T extends { [key: string]: any }>(page: Page<T>) =>
        page.tags;

    public get aliases() {
        return this.m.aliases;
    }

    public get file() {
        return this.m.file;
    }

    public get tags() {
        return this.m.tags;
    }

    public property = <K extends keyof T>(key: K) => this.m.properties[key];

    public static property =
        <T extends { [key: string]: any }, K extends keyof T>(key: K) =>
        (page: Page<T>) =>
            page.property(key);

    public toMarkdownLink = (display?: string) =>
        Markdown.link(this.file.name, display);

    public static toMarkdownLink = <T>(page: Page<T>) => page.toMarkdownLink();
}
