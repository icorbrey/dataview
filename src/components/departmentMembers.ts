import { Option, Some } from 'utils/option';
import { Markdown } from 'utils/markdown';
import { Person } from 'models/person';
import { Render } from 'utils/render';
import { Link } from 'models/link';
import { pipe } from 'utils/func';

export const departmentMembers = {
    component: () =>
        Render.callout({
            content: Some(Render.view('@departmentMembers.content')),
            header: Render.view('@departmentMembers.header'),
            modifier: 'closed',
            type: 'info',
        }),
    header: () => {
        const count = query.all().length;

        return Render.span(
            0 < count
                ? `Department members (${count})`
                : 'No department members',
        );
    },
    content: () =>
        Render.table(
            ['Name', 'Email', 'Phone'],
            query
                .all()
                .map((row) => [
                    Markdown.link(row.file.name),
                    row.property('email').unwrapOr(undefined),
                    row.property('phone').unwrapOr(undefined),
                ]),
        ),
};

const query = {
    all: () =>
        Person.query()
            .where(
                pipe(
                    Person.property('department'),
                    Option.isSomeAnd(Link.isReferenceToCurrentPage),
                ),
            )
            .sort((person) => person.file.name),
};
