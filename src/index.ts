import { pendingActionItems } from 'components/pendingActionItems';
import { activeWorkItems } from 'components/activeWorkItems';
import { Registry } from 'utils/registry';

/** Input value from Dataview call in Obsidian. */
declare const input: unknown;

export type RegistryEntries =
    typeof registry extends Registry<infer T> ? keyof T : never;

const registry = Registry.new()
    .register('activeWorkItems.content', activeWorkItems.content)
    .register('activeWorkItems.header', activeWorkItems.header)
    .register('activeWorkItems', activeWorkItems.component)
    .register('pendingActionItems.content', pendingActionItems.content)
    .register('pendingActionItems.header', pendingActionItems.header)
    .register('pendingActionItems', pendingActionItems.component);

registry.run(input);
