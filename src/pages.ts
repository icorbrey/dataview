import { Render } from './utils/render';

export const pages = {
    database: () => Render.views(['#databaseTables']),
    department: () =>
        Render.views([
            '#pendingActionItems',
            '#recentMeetings',
            '#departmentMembers',
        ]),
    organization: () =>
        Render.views(['#employees', '#students', '#recentMeetings']),
    person: () =>
        Render.views([
            '#pendingActionItems',
            '#recentMeetings',
            '#recentConversations',
            '#directReports',
        ]),
    swimlane: () => Render.views(['#databases']),
    system: () =>
        Render.views([
            '#pendingActionItems',
            '#activeWorkItems',
            '#subjectMatterExperts',
            '#recentMeetings',
        ]),
    team: () =>
        Render.views([
            '#pendingActionItems',
            '#recentMeetings',
            '#teamMembers',
        ]),
    workItem: () => Render.views(['#pendingActionItems', '#recentMeetings']),
};
