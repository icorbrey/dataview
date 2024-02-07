import { Page, type Link } from 'utils/page';
import { Option } from 'utils/option';
import { Query } from 'utils/query';
import { pipe } from 'utils/func';

export class WorkItem {
    private constructor() {}

    public static description = Page.property<string>('description');
    public static complete = Page.property<boolean>('complete');
    public static system = Page.property<Link>('system');
    public static owner = Page.property<Link>('owner');
    public static id = Page.property<string>('id');

    public static fetchAll = () =>
        dv.pages('#transient/work-item AND !"templates"');

    public static isActive = pipe(
        WorkItem.complete,
        Option.unwrapOr(false),
        Query.negate,
    );
}
