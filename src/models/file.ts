import type { DateTime } from 'utils/luxon';
import { Option } from 'utils/option';
import { Array } from 'utils/array';
import { Link } from 'models/link';
import { Task } from 'models/task';
import { Page } from './page';

type FileState = {
    aliases: string[];
    createdAt: DateTime;
    createdOn: DateTime;
    extension: string;
    folder: string;
    frontmatter: Record<string, any>;
    inlinks: Link[];
    link: Link;
    lastModifiedAt: DateTime;
    lastModifiedOn: DateTime;
    name: string;
    outlinks: Link[];
    path: string;
    tags: string[];
    tasks: Task[];
};

export class File {
    private m: FileState;
    private constructor(m: FileState) {
        this.m = m;
    }

    public static current = () => Page.current().file;

    public static fromRecord = (file: Record<string, any>) =>
        new File({
            lastModifiedAt: Option.fromNullable(file.mtime).expect(
                'File should have had a last modified time.',
            ),
            lastModifiedOn: Option.fromNullable(file.mday).expect(
                'File should have had a last modified date.',
            ),
            outlinks: Option.fromNullable(file.outlinks).mapOr(
                [],
                Array.map(Link.fromRecord),
            ),
            createdAt: Option.fromNullable(file.ctime).expect(
                'File should have had a creation time.',
            ),
            createdOn: Option.fromNullable(file.cday).expect(
                'File should have had a creation date.',
            ),
            inlinks: Option.fromNullable(file.inlinks).mapOr(
                [],
                Array.map(Link.fromRecord),
            ),
            extension: Option.fromNullable(file.ext).expect(
                'File should have had a name.',
            ),
            tasks: Option.fromNullable(file.tasks).mapOr(
                [],
                Array.map(Task.fromRecord),
            ),
            name: Option.fromNullable(file.name).expect(
                'File should have had a name.',
            ),
            path: Option.fromNullable(file.path).expect(
                'File should have had a path.',
            ),
            link: Option.fromNullable(file.link)
                .map(Link.fromRecord)
                .expect('File should have had a link.'),

            frontmatter: Option.fromNullable(file.frontmatter).unwrapOr({}),
            aliases: Option.fromNullable(file.aliases).unwrapOr([]),
            folder: Option.fromNullable(file.folder).unwrapOr(''),
            tags: Option.fromNullable(file.tags).unwrapOr([]),
        });

    public static lastModifiedAt = (file: File) => file.lastModifiedAt;
    public static lastModifiedOn = (file: File) => file.lastModifiedOn;
    public static frontmatter = (file: File) => file.frontmatter;
    public static createdAt = (file: File) => file.createdAt;
    public static createdOn = (file: File) => file.createdOn;
    public static extension = (file: File) => file.extension;
    public static outlinks = (file: File) => file.outlinks;
    public static aliases = (file: File) => file.aliases;
    public static inlinks = (file: File) => file.inlinks;
    public static folder = (file: File) => file.folder;
    public static tasks = (file: File) => file.tasks;
    public static link = (file: File) => file.link;
    public static name = (file: File) => file.name;
    public static path = (file: File) => file.path;
    public static tags = (file: File) => file.tags;

    public get aliases() {
        return this.m.aliases;
    }

    public get createdAt() {
        return this.m.createdAt;
    }

    public get createdOn() {
        return this.m.createdOn;
    }

    public get extension() {
        return this.m.extension;
    }

    public get folder() {
        return this.m.folder;
    }

    public get frontmatter() {
        return this.m.frontmatter;
    }

    public get inlinks() {
        return this.m.inlinks;
    }

    public get link() {
        return this.m.link;
    }

    public get lastModifiedAt() {
        return this.m.lastModifiedAt;
    }

    public get lastModifiedOn() {
        return this.m.lastModifiedOn;
    }

    public get name() {
        return this.m.name;
    }

    public get outlinks() {
        return this.m.outlinks;
    }

    public get path() {
        return this.m.path;
    }

    public get tags() {
        return this.m.tags;
    }

    public get tasks() {
        return this.m.tasks;
    }
}
