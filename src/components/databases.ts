import { Option, Some } from 'utils/option';
import { Database } from 'models/database';
import { Render } from 'utils/render';
import { Link } from 'models/link';
import { pipe } from 'utils/func';

export const databases = {
    component: () =>
        Render.callout({
            content: Some(Render.view('@databases.content')),
            header: Render.view('@databases.header'),
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
        Database.query()
            .where(
                pipe(
                    Database.property('swimlane'),
                    Option.isSomeAnd(Link.isReferenceToCurrentPage),
                ),
            )
            .sort((database) => database.file.name),
};
