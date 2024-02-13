import { Option, Some } from 'utils/option';
import { Markdown } from 'utils/markdown';
import { Person } from 'models/person';
import { Render } from 'utils/render';
import { Link } from 'models/link';
import { pipe } from 'utils/func';

export const students = {
    component: () =>
        0 < query.all().length
            ? Render.callout({
                  content: Some(Render.view('@students.content')),
                  header: Render.view('@students.header'),
                  modifier: 'closed',
                  type: 'info',
              })
            : undefined,
    header: () => Render.span(`Students (${query.all().length})`),
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
                    Person.property('school'),
                    Option.isSomeAnd(Link.isReferenceToCurrentPage),
                ),
            )
            .sort((person) => person.file.name),
};
