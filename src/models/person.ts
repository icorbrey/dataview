import { Option } from 'utils/option';
import { Array } from 'utils/array';
import { Link } from 'models/link';
import { Page } from 'models/page';

type PersonState = {
    allergies: string[];
    department: Option<Link>;
    email: Option<string>;
    employer: Option<Link>;
    expertOn: Link[];
    favoriteDonut: Option<string>;
    firstName: string;
    githubUrl: Option<string>;
    graduationYear: Option<number>;
    lastName: string;
    major: Option<Link>;
    minor: Option<Link>;
    phone: Option<string>;
    reportsTo: Option<Link>;
    school: Option<Link>;
    teams: Link[];
};

export class Person {
    private constructor() {}

    public static query = () =>
        dv.pages('#transient/person AND !"templates"').map(Person.fromRecord);

    public static fromRecord = (page: Record<string, any>) =>
        Page.fromRecord<PersonState>(page, (page) => ({
            firstName: Option.fromNullable(page['first-name']).expect(
                'Person should have had a first name.',
            ),
            lastName: Option.fromNullable(page['last-name']).expect(
                'Person should have had a last name.',
            ),
            expertOn: Option.fromNullable(page['expert-on'])
                .map(Array.normalize)
                .map(Array.map(Link.fromRecord))
                .unwrapOr([]),
            allergies: Option.fromNullable(page.allergies)
                .map(Array.normalize)
                .unwrapOr([]),
            teams: Option.fromNullable(page.teams)
                .map(Array.normalize)
                .map(Array.map(Link.fromRecord))
                .unwrapOr([]),

            department: Option.fromNullable(page.department).map(
                Link.fromRecord,
            ),
            reportsTo: Option.fromNullable(page['reports-to']).map(
                Link.fromRecord,
            ),
            employer: Option.fromNullable(page.employer).map(Link.fromRecord),
            school: Option.fromNullable(page.school).map(Link.fromRecord),
            graduationYear: Option.fromNullable(page['graduation-year']),
            major: Option.fromNullable(page.major).map(Link.fromRecord),
            minor: Option.fromNullable(page.minor).map(Link.fromRecord),
            favoriteDonut: Option.fromNullable(page['favorite-donut']),
            githubUrl: Option.fromNullable(page.github),
            email: Option.fromNullable(page.email),
            phone: Option.fromNullable(page.phone),
        }));

    public static property = <K extends keyof PersonState>(key: K) =>
        Page.property<PersonState, K>(key);
}
