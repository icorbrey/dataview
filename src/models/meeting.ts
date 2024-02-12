import type { DateTime } from 'utils/luxon';
import { Option } from 'utils/option';
import { Array } from 'utils/array';
import { Link } from 'models/link';
import { Page } from 'models/page';

type MeetingState = {
    attendees: Link[];
    date: DateTime;
    topics: Link[];
};

export class Meeting {
    private constructor() {}

    public static query = () =>
        dv.pages('#transient/meeting AND !"templates"').map(Meeting.fromRecord);

    public static fromRecord = (page: Record<string, any>) =>
        Page.fromRecord<MeetingState>(page, (page) => ({
            attendees: Option.fromNullable(page.attendees)
                .map(Array.map(Link.fromRecord))
                .unwrapOr([]),
            date: Option.fromNullable(page.date).expect(
                'Meeting should have had a date.',
            ),
            topics: Option.fromNullable(page.topics)
                .map(Array.map(Link.fromRecord))
                .unwrapOr([]),
        }));
}
