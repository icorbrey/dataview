import { Option } from 'utils/option';
import { Link } from 'models/link';
import { Page } from 'models/page';

type DatabaseState = {
    description: Option<string>;
    name: string;
    swimlane: Option<Link>;
};

export class Database {
    private constructor() {}

    public static query = () =>
        dv.pages('#moc/database AND !"templates"').map(Database.fromRecord);

    public static fromRecord = (page: Record<string, any>) =>
        Page.fromRecord<DatabaseState>(page, (page) => ({
            description: Option.fromNullable(page.description).filter(
                (d) => 0 < d.length,
            ),

            swimlane: Option.fromNullable(page.swimlane).map(Link.fromRecord),
            name: page.name,
        }));

    public static property = <K extends keyof DatabaseState>(key: K) =>
        Page.property<DatabaseState, K>(key);
}
