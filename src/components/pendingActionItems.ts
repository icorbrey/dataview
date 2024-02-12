import { Option, Some } from 'utils/option';
import { Meeting } from 'models/meeting';
import { Render } from 'utils/render';
import { Array } from 'utils/array';
import { Query } from 'utils/query';
import { Link } from 'models/link';
import { Task } from 'models/task';
import { Date } from 'utils/date';
import { pipe } from 'utils/func';

const query = {
    all: () =>
        Meeting.query()
            .where(
                Query.or(
                    pipe(
                        Meeting.property('topics'),
                        Array.some(Link.isReferenceToCurrentPage),
                    ),
                    pipe(
                        Meeting.tasks,
                        Array.some(Task.hasOutlinkToCurrentPage),
                    ),
                ),
            )
            .file.tasks.where(
                Query.and(Task.isInSection('Action items'), Task.hasText),
            ),

    // {

    //     return Meeting.query().file.tasks.where(
    //         Query.and(
    //             Task.isInSection('Action items'),
    //             Task.hasText,
    //             Task.hasOutlinkToCurrentPage,
    //         ),
    //     );
    // },
    incomplete: () => query.all().where(Task.isIncomplete),
    incompleteAndCompletedToday: () =>
        query
            .all()
            .where(
                Query.or(
                    Task.isIncomplete,
                    pipe(Task.completedOn, Option.isSomeAnd(Date.isToday)),
                ),
            )
            .map((task: Task) => task.dataviewTask),
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
                : 'No pending action items',
        );
    },
    content: () => {
        Render.taskList(query.incompleteAndCompletedToday());
    },
};
