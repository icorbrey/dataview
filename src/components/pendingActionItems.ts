import { Option, Some } from 'utils/option';
import { Meeting } from 'models/meeting';
import { Render } from 'utils/render';
import { Array } from 'utils/array';
import { Query } from 'utils/query';
import { Page } from 'models/page';
import { Date } from 'utils/date';
import { pipe } from 'utils/func';
import { Task } from 'utils/task';
import { Link } from '../models/link';

const query = {
    all: () =>
        Meeting.query().file.tasks.where(
            Query.and(
                Task.hasText,
                Task.isInSection('Action items'),
                pipe(
                    Task.outlinks,
                    Array.some(Link.isReferenceTo(Page.current().file.link)),
                ),
            ),
        ),
    incomplete: () => query.all().where(Task.isIncomplete),
    incompleteAndCompletedToday: () =>
        query
            .all()
            .where(
                Query.or(
                    Task.isIncomplete,
                    pipe(
                        Task.completedOn,
                        Option.map(Date.isToday),
                        Option.unwrapOr(false),
                    ),
                ),
            ),
};

export const pendingActionItems = {
    component: () =>
        Render.callout({
            modifier:
                0 < query.incompleteAndCompletedToday().length
                    ? 'open'
                    : 'closed',
            content: Some(Render.view('pendingActionItems.content')),
            header: Render.view('pendingActionItems.header'),
            type: 'todo',
        }),
    header: () => {
        const count = query.incomplete().length;

        dv.span(
            0 < count
                ? `Pending action items (${count} remaining)`
                : 'No pending action items remaining',
        );
    },
    content: () => Render.taskList(query.incompleteAndCompletedToday()),
};
