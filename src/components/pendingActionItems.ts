import { Option, Some } from 'utils/option';
import { Meeting } from 'models/meeting';
import { Render } from 'utils/render';
import { Query } from 'utils/query';
import { Task } from 'models/task';
import { Date } from 'utils/date';
import { pipe } from 'utils/func';

const query = {
    all: () =>
        Meeting.query().file.tasks.where(
            Query.and(
                Task.isInSection('Action items'),
                Task.hasOutlinkToCurrentPage,
                Task.hasText,
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
            content: Some(Render.view('@pendingActionItems.content')),
            header: Render.view('@pendingActionItems.header'),
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
