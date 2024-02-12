import { Markdown } from 'utils/markdown';
import { Option } from 'utils/option';
import { File } from './file';

type LinkType = 'file' | 'section' | 'block';

type LinkState = {
    display: Option<string>;
    subpath: Option<string>;
    embed: boolean;
    type: LinkType;
    path: string;
};

export class Link {
    private m: LinkState;
    private constructor(m: LinkState) {
        this.m = m;
    }

    public static current = () => File.current().link;

    public static fromRecord = (record: Record<string, any>): Link =>
        new Link({
            display: Option.fromNullable(record.display),
            subpath: Option.fromNullable(record.subpath),
            embed: record.embed ?? false,
            path: record.path ?? '',
            type: record.type,
        });

    public isReferenceTo = (target: Link) => this.path === target.path;

    public static isReferenceTo = (target: Link) => (source: Link) =>
        source.isReferenceTo(target);

    public static isReferenceToCurrentPage = (link: Link) =>
        link.isReferenceToCurrentPage;

    public toMarkdownLink = (display?: string) =>
        Markdown.link(
            this.path,
            Option.fromNullable(display).or(this.display).unwrapOr(undefined),
        );

    public static toMarkdownLink = (link: Link) => link.toMarkdownLink();

    public static subpath = (link: Link) => link.subpath;
    public static display = (link: Link) => link.display;
    public static embed = (link: Link) => link.embed;
    public static path = (link: Link) => link.path;
    public static type = (link: Link) => link.type;

    public get isReferenceToCurrentPage() {
        return this.isReferenceTo(Link.current());
    }

    public get subpath() {
        return this.m.subpath;
    }

    public get display() {
        return this.m.display;
    }

    public get embed() {
        return this.m.embed;
    }

    public get path() {
        return this.m.path;
    }

    public get type() {
        return this.m.type;
    }
}
