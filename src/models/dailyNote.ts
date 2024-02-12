import { Page } from 'models/page';

type DailyNoteState = {};

export class DailyNote {
    private constructor() {}

    public static query = () =>
        dv.pages('#transient/daily AND !"templates"').map(DailyNote.fromRecord);

    public static fromRecord = (page: Record<string, any>) =>
        Page.fromRecord<DailyNoteState>(page, (page) => ({}));
}
