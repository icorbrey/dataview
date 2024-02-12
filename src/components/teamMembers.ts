import { Markdown } from 'utils/markdown';
import { Person } from 'models/person';
import { Render } from 'utils/render';
import { Array } from 'utils/array';
import { Some } from 'utils/option';
import { Link } from 'models/link';
import { pipe } from 'utils/func';

export const teamMembers = {
    component: () =>
        Render.callout({
            content: Some(Render.view('@teamMembers.content')),
            header: Render.view('@teamMembers.header'),
            modifier: 'closed',
            type: 'info',
        }),
    header: () => {
        const count = query.all().length;

        return Render.span(
            0 < count ? `Team members (${count})` : 'No team members',
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
                    Person.property('teams'),
                    Array.some(Link.isReferenceToCurrentPage),
                ),
            )
            .sort((person) => person.file.name),
};
