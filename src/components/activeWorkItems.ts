import { Option, Some } from 'utils/option';
import { WorkItem } from 'models/workItem';
import { Markdown } from 'utils/markdown';
import { Render } from 'utils/render';
import { Query } from 'utils/query';
import { Link } from 'models/link';
import { pipe } from 'utils/func';

export const activeWorkItems = {
    component: () =>
        Render.callout({
            content: Some(Render.view('@activeWorkItems.content')),
            header: Render.view('@activeWorkItems.header'),
            modifier: 'closed',
            type: 'todo',
        }),
    content: () =>
        Render.table(
            ['ID', 'Description', 'Owner'],
            query
                .all()
                .map((row) => [
                    Markdown.link(row.file.path, row.property('id')),
                    row.property('description'),
                    row
                        .property('owner')
                        .map(Link.toMarkdownLink)
                        .unwrapOr(undefined),
                ]),
        ),
    header: () => {
        const count = query.all().length;

        return Render.span(
            0 < count ? `Active work items (${count})` : 'No active work items',
        );
    },
};

const query = {
    all: () =>
        WorkItem.query()
            .where(
                Query.and(
                    WorkItem.property('isActive'),
                    pipe(
                        WorkItem.property('system'),
                        Option.isSomeAnd(Link.isReferenceToCurrentPage),
                    ),
                ),
            )
            .sort((workItem) => workItem.file.name),
};
