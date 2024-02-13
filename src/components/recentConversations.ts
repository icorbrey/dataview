import { Option, Some } from 'utils/option';
import { Render } from 'utils/render';
import { Query } from 'utils/query';
import { Page } from 'models/page';
import { Task } from 'models/task';

export const recentConversations = {
    component: () =>
        Render.callout({
            content: Some(Render.view('@recentConversations.content')),
            header: Render.view('@recentConversations.header'),
            modifier: 'closed',
            type: 'tip',
        }),
    header: () => {
        const count = query.all().length;

        dv.span(
            0 < count
                ? `Recent conversations (${count})`
                : 'No recent conversations',
        );
    },
    content: () => {
        Render.taskList(query.all());
    },
};

const query = {
    all: () =>
        Page.query()
            .file.tasks.where(
                Query.and(
                    Task.isIncomplete,
                    Task.hasText,
                    Task.hasOutlinkToCurrentPage,
                ),
            )
            .limit(10),
};
