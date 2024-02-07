import { Registry } from 'utils/registry';
import {
    activeWorkItemsContent,
    activeWorkItemsHeader,
    activeWorkItems,
} from 'views/activeWorkItems';

/** Input value from Dataview call in Obsidian. */
declare const input: unknown;

Registry.new()
    .register('activeWorkItemsContent', activeWorkItemsContent)
    .register('activeWorkItemsHeader', activeWorkItemsHeader)
    .register('activeWorkItems', activeWorkItems)
    .run(input);
