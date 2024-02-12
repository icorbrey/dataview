import { Render } from './utils/render';

export const pages = {
    department: () =>
        Render.views([
            '#pendingActionItems',
            '#recentMeetings',
            '#departmentMembers',
        ]),
    system: () =>
        Render.views([
            '#pendingActionItems',
            '#activeWorkItems',
            '#subjectMatterExperts',
            '#recentMeetings',
        ]),
};
