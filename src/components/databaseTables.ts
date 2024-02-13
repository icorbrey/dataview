import { DatabaseTable } from 'models/databaseTable';
import { Option, Some } from 'utils/option';
import { Render } from 'utils/render';
import { Link } from 'models/link';
import { pipe } from 'utils/func';

export const databaseTables = {
    component: () =>
        Render.callout({
            content: Some(Render.view('@databaseTables.content')),
            header: Render.view('@databaseTables.header'),
            modifier: 'open',
            type: 'info',
        }),
    header: () => {
        const count = query.all().length;

        return Render.span(0 < count ? `Tables (${count})` : 'No tables');
    },
    content: () =>
        Render.table(
            ['Name', 'Description'],
            query
                .all()
                .array()
                .map(
                    (row) =>
                        [
                            row.toMarkdownLink(row.property('name')),
                            row.property('description').unwrapOr(undefined),
                        ] as any,
                ),
        ),
};

const query = {
    all: () =>
        DatabaseTable.query()
            .where(
                pipe(
                    DatabaseTable.property('database'),
                    Option.isSomeAnd(Link.isReferenceToCurrentPage),
                ),
            )
            .sort((table) => table.file.name),
};
