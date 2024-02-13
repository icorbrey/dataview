import { Option } from 'utils/option';
import { Link } from 'models/link';
import { Page } from 'models/page';

type DatabaseTableState = {
    database: Option<Link>;
    description: Option<string>;
    name: string;
};

export class DatabaseTable {
    private constructor() {}

    public static query = () =>
        dv
            .pages('#concept/table AND !"templates"')
            .map(DatabaseTable.fromRecord);

    public static fromRecord = (page: Record<string, any>) =>
        Page.fromRecord<DatabaseTableState>(page, (page) => ({
            description: Option.fromNullable(page.description).filter(
                (d) => 0 < d.length,
            ),

            database: Option.fromNullable(page.database).map(Link.fromRecord),
            name: page.name,
        }));

    public static property = <K extends keyof DatabaseTableState>(key: K) =>
        Page.property<DatabaseTableState, K>(key);
}
