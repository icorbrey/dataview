import { Page, type Link } from 'utils/page';
import { Option, Some } from 'utils/option';
import { WorkItem } from 'models/workItems';
import { Render } from 'utils/render';
import { link } from 'markdown/link';
import { Array } from 'utils/array';
import { Query } from 'utils/query';
import { pipe } from 'utils/func';

const getActiveWorkItems = () =>
    WorkItem.fetchAll().where(
        Query.and(
            WorkItem.isActive,
            pipe(
                WorkItem.system,
                Option.unwrapOr<Link>({}),
                Page.isLinkToCurrentPage,
            ),
        ),
    );

const table = Array.map((row) => [
    link(row, pipe(WorkItem.id, Option.unwrapOr(undefined))(row)),
    pipe(WorkItem.description, Option.unwrapOr(undefined))(row),
    pipe(WorkItem.owner, Option.unwrapOr(undefined))(row),
]);

export const activeWorkItems = () =>
    Render.callout({
        content: Some(Render.view('activeWorkItemsContent')),
        header: Render.view('activeWorkItemsHeader'),
        modifier: 'closed',
        type: 'todo',
    });

export const activeWorkItemsContent = () =>
    Render.table(
        ['Work Item', 'Description', 'Owner'],
        table(getActiveWorkItems().array()),
    );

export const activeWorkItemsHeader = () => {
    const count = getActiveWorkItems().length;

    return Render.span(
        0 < count ? `Active work items (${count})` : 'No active work items',
    );
};
