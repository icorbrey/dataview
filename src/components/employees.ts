import { Option, Some } from 'utils/option';
import { Markdown } from 'utils/markdown';
import { Person } from 'models/person';
import { Render } from 'utils/render';
import { Link } from 'models/link';
import { pipe } from 'utils/func';

export const employees = {
    component: () =>
        Render.callout({
            content: Some(Render.view('@employees.content')),
            header: Render.view('@employees.header'),
            modifier: 'closed',
            type: 'info',
        }),
    header: () => {
        const count = query.all().length;

        return Render.span(0 < count ? `Employees (${count})` : 'No employees');
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
                    Person.property('employer'),
                    Option.isSomeAnd(Link.isReferenceToCurrentPage),
                ),
            )
            .sort((person) => person.file.name),
};
