import type { Link } from 'models/link';
import { Option } from 'utils/option';
import { Array } from 'utils/array';
import { Page } from 'models/page';

type PersonState = {
    allergies: string[];
    department: Option<Link>;
    email: Option<string>;
    employer: Option<string>;
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
            teams: Option.fromNullable(page.teams).mapOr([], Array.normalize),
            firstName: Option.fromNullable(page['first-name']).expect(
                'Person should have had a first name.',
            ),
            lastName: Option.fromNullable(page['last-name']).expect(
                'Person should have had a last name.',
            ),
            expertOn: Option.fromNullable(page['expert-on']).mapOr(
                [],
                Array.normalize,
            ),
            allergies: Option.fromNullable(page.allergies).mapOr(
                [],
                Array.normalize,
            ),

            graduationYear: Option.fromNullable(page['graduation-year']),
            favoriteDonut: Option.fromNullable(page['favorite-donut']),
            reportsTo: Option.fromNullable(page['reports-to']),
            department: Option.fromNullable(page.department),
            employer: Option.fromNullable(page.employer),
            githubUrl: Option.fromNullable(page.github),
            school: Option.fromNullable(page.school),
            email: Option.fromNullable(page.email),
            major: Option.fromNullable(page.major),
            minor: Option.fromNullable(page.minor),
            phone: Option.fromNullable(page.phone),
        }));
}
