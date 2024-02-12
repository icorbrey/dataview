import type { DateTime } from 'utils/luxon';
import { Link } from 'models/link';
import { Option } from 'utils/option';
import { Array } from 'utils/array';
import { pipe } from '../utils/func';
import { Query } from '../utils/query';

type TaskState = {
    completedOn: Option<DateTime>;
    dueOn: Option<DateTime>;
    header: Option<Link>;
    isComplete: boolean;
    outlinks: Link[];
    path: string;
    section: Option<Link>;
    subtasks: Task[];
    tags: string[];
    text: Option<string>;
};

export class Task {
    private m: TaskState;

    private constructor(m: TaskState) {
        this.m = m;
    }

    public static fromRecord = (task: Record<string, any>): Task =>
        new Task({
            subtasks: Option.fromNullable(task.subtasks).mapOr(
                [],
                Array.map(Task.fromRecord),
            ),
            path: Option.fromNullable(task.path).expect(
                'Task should have had a path.',
            ),
            text: Option.fromNullable(task.text).filter(
                (text) => 0 < text.length,
            ),

            isComplete: Option.fromNullable(task.completed).unwrapOr(false),
            outlinks: Option.fromNullable(task.outlinks).unwrapOr([]),
            completedOn: Option.fromNullable(task.completion),
            tags: Option.fromNullable(task.tags).unwrapOr([]),
            section: Option.fromNullable(task.section),
            header: Option.fromNullable(task.header),
            dueOn: Option.fromNullable(task.due),
        });

    public hasOutlinkTo = (link: Link) =>
        this.outlinks.some(Link.isReferenceTo(link));

    public static hasOutlinkTo = (link: Link) => (task: Task) =>
        task.hasOutlinkTo(link);

    public get hasOutlinkToCurrentPage() {
        return this.outlinks.some(Link.isReferenceToCurrentPage);
    }

    public static hasOutlinkToCurrentPage = (task: Task) =>
        task.hasOutlinkToCurrentPage;

    public hasText = () => this.text.isSome();

    public static hasText = (task: Task) => task.hasText();

    public isInSection = (section: string) =>
        this.section.map(Link.subpath).mapOr(false, Query.equals(section));

    public static isInSection = (section: string) => (task: Task) =>
        task.isInSection(section);

    public static isIncomplete = (task: Task) => task.isIncomplete;
    public static completedOn = (task: Task) => task.completedOn;
    public static isComplete = (task: Task) => task.isComplete;
    public static outlinks = (task: Task) => task.outlinks;
    public static subtasks = (task: Task) => task.subtasks;
    public static section = (task: Task) => task.section;
    public static header = (task: Task) => task.header;
    public static dueOn = (task: Task) => task.dueOn;
    public static path = (task: Task) => task.path;
    public static tags = (task: Task) => task.tags;
    public static text = (task: Task) => task.text;

    public get isIncomplete() {
        return !this.isComplete;
    }

    public get completedOn() {
        return this.m.completedOn;
    }

    public get isComplete() {
        return this.m.isComplete;
    }

    public get outlinks() {
        return this.m.outlinks;
    }

    public get subtasks() {
        return this.m.subtasks;
    }

    public get section() {
        return this.m.section;
    }

    public get header() {
        return this.m.header;
    }

    public get dueOn() {
        return this.m.dueOn;
    }

    public get path() {
        return this.m.path;
    }

    public get tags() {
        return this.m.tags;
    }

    public get text() {
        return this.m.text;
    }
}
