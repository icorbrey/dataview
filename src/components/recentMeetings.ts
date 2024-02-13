import { Meeting } from 'models/meeting';
import { Render } from 'utils/render';
import { Some } from 'utils/option';
import { Page } from 'models/page';
import { pipe } from '../utils/func';
import { Array } from '../utils/array';
import { Link } from '../models/link';
import { Query } from '../utils/query';
import { Date } from '../utils/date';

export const recentMeetings = {
    component: () =>
        Render.callout({
            content: Some(Render.view('@recentMeetings.content')),
            header: Render.view('@recentMeetings.header'),
            modifier: 'closed',
            type: 'example',
        }),
    content: () => Render.list(query.all().map(Page.toMarkdownLink()), false),
    header: () => {
        const count = query.all().length;

        return Render.span(
            0 < count ? `Recent meetings (${count})` : 'No recent meetings',
        );
    },
};

const query = {
    all: () =>
        Meeting.query().where(
            Query.and(
                Query.or(
                    pipe(
                        Meeting.property('attendees'),
                        Array.some(Link.isReferenceToCurrentPage),
                    ),
                    pipe(
                        Meeting.property('topics'),
                        Array.some(Link.isReferenceToCurrentPage),
                    ),
                ),
                pipe(
                    Meeting.property('date'),
                    Date.occurredInLast({ days: 14 }),
                ),
            ),
        ),
};
