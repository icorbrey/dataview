import { subjectMatterExperts } from 'components/subjectMatterExperts';
import { recentConversations } from 'components/recentConversations';
import { pendingActionItems } from 'components/pendingActionItems';
import { departmentMembers } from 'components/departmentMembers';
import { activeWorkItems } from 'components/activeWorkItems';
import { recentMeetings } from 'components/recentMeetings';
import { directReports } from 'components/directReports';
import { teamMembers } from 'components/teamMembers';
import { employees } from 'components/employees';
import { Registry } from 'utils/registry';
import { pages } from 'pages';
import { students } from './components/students';

/** Input value from Dataview call in Obsidian. */
declare const input: unknown;

export type RegistryEntries =
    typeof registry extends Registry<infer T> ? keyof T : never;

const registry = Registry.new()
    .register('#activeWorkItems', activeWorkItems.component)
    .register('@activeWorkItems.content', activeWorkItems.content)
    .register('@activeWorkItems.header', activeWorkItems.header)
    .register('#departmentMembers', departmentMembers.component)
    .register('@departmentMembers.content', departmentMembers.content)
    .register('@departmentMembers.header', departmentMembers.header)
    .register('#directReports', directReports.component)
    .register('@directReports.content', directReports.content)
    .register('@directReports.header', directReports.header)
    .register('#employees', employees.component)
    .register('@employees.content', employees.content)
    .register('@employees.header', employees.header)
    .register('#pendingActionItems', pendingActionItems.component)
    .register('@pendingActionItems.content', pendingActionItems.content)
    .register('@pendingActionItems.header', pendingActionItems.header)
    .register('#recentConversations', recentConversations.component)
    .register('@recentConversations.content', recentConversations.content)
    .register('@recentConversations.header', recentConversations.header)
    .register('#recentMeetings', recentMeetings.component)
    .register('@recentMeetings.content', recentMeetings.content)
    .register('@recentMeetings.header', recentMeetings.header)
    .register('#students', students.component)
    .register('@students.content', students.content)
    .register('@students.header', students.header)
    .register('#subjectMatterExperts', subjectMatterExperts.component)
    .register('@subjectMatterExperts.content', subjectMatterExperts.content)
    .register('@subjectMatterExperts.header', subjectMatterExperts.header)
    .register('#teamMembers', teamMembers.component)
    .register('@teamMembers.content', teamMembers.content)
    .register('@teamMembers.header', teamMembers.header)
    .register('_department', pages.department)
    .register('_organization', pages.organization)
    .register('_person', pages.person)
    .register('_system', pages.system)
    .register('_team', pages.team)
    .register('_workItem', pages.workItem);

registry.run(input);
