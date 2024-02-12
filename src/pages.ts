import { Render } from './utils/render';

export const pages = {
    system: () =>
        Render.views([
            '#pendingActionItems',
            '#activeWorkItems',
            '#subjectMatterExperts',
        ]),
};
