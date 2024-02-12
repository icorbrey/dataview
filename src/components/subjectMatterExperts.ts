import { Markdown } from 'utils/markdown';
import { Person } from 'models/person';
import { Render } from 'utils/render';
import { Array } from 'utils/array';
import { Some } from 'utils/option';
import { Link } from 'models/link';
import { pipe } from 'utils/func';

export const subjectMatterExperts = {
    component: () =>
        Render.callout({
            content: Some(Render.view('subjectMatterExperts.content')),
            header: Render.view('subjectMatterExperts.header'),
            modifier: 'closed',
            type: 'info',
        }),
    header: () => {
        const count = query.all().length;

        console.log(query.all());

        return Render.span(
            0 < count
                ? `Subject matter experts (${count})`
                : 'No subject matter experts',
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
        Person.query().where(
            pipe(
                Person.property('expertOn'),
                Array.some(Link.isReferenceToCurrentPage),
            ),
        ),
};
