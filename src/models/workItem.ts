import { Link } from 'models/link';
import { Option } from 'utils/option';
import { Page } from 'models/page';
import { pipe } from '../utils/func';
import { Query } from '../utils/query';

type WorkItemState = {
    description: string;
    devopsUrl: Option<string>;
    engineering: Option<Link>;
    id: string;
    isActive: boolean;
    isComplete: boolean;
    owner: Option<Link>;
    rfcUrl: Option<string>;
    sourceCardUrl: Option<string>;
    summary: Option<string>;
    support: Option<Link>;
    system: Option<Link>;
    trelloCardUrl: Option<string>;
};

export type WorkItemPage = Page<WorkItemState>;

export class WorkItem {
    private constructor() {}

    public static query = () =>
        dv
            .pages('#transient/work-item AND !"templates"')
            .map(WorkItem.fromRecord);

    public static fromRecord = (page: Record<string, any>) =>
        Page.fromRecord<WorkItemState>(page, (page) => ({
            description: Option.fromNullable(page.description).expect(
                'Work item should have had a description.',
            ),
            engineering: Option.fromNullable(page.engineering).map(
                Link.fromRecord,
            ),
            id: Option.fromNullable(page.id).expect(
                'Work item should have had an ID.',
            ),
            isActive: pipe(
                Option.fromNullable,
                Option.unwrapOr(false),
                Query.negate,
            )(page.complete),

            support: Option.fromNullable(page.support).map(Link.fromRecord),
            isComplete: Option.fromNullable(page.complete).unwrapOr(false),
            system: Option.fromNullable(page.system).map(Link.fromRecord),
            owner: Option.fromNullable(page.owner).map(Link.fromRecord),
            sourceCardUrl: Option.fromNullable(page['source-card']),
            trelloCardUrl: Option.fromNullable(page['trello-card']),
            devopsUrl: Option.fromNullable(page['devops-card']),
            rfcUrl: Option.fromNullable(page['rfc-card']),
            summary: Option.fromNullable(page.summary),
        }));

    public static property = <K extends keyof WorkItemState>(key: K) =>
        Page.property<WorkItemState, K>(key);
}
