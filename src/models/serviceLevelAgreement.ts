import type { Link } from 'models/link';
import { Option } from 'utils/option';
import { Page } from 'models/page';

type ServiceLevelAgreementState = {
    primaryUsers: Option<string | Link>;
    primarySupport: Option<Link>;
    secondarySupport: Option<Link>;
    serviceWindow: Option<string>;
    system: Option<Link>;
    tertiarySupport: Option<Link>;
};

export class ServiceLevelAgreement {
    private constructor() {}

    public static query = () =>
        dv
            .pages('#concept/sla AND !"templates"')
            .map(ServiceLevelAgreement.fromRecord);

    public static fromRecord = (page: Record<string, any>) =>
        Page.fromRecord<ServiceLevelAgreementState>(page, (page) => ({
            secondarySupport: Option.fromNullable(page['secondary-support']),
            tertiarySupport: Option.fromNullable(page['tertiary-support']),
            primarySupport: Option.fromNullable(page['primary-support']),
            serviceWindow: Option.fromNullable(page['service-window']),
            primaryUsers: Option.fromNullable(page['primary-users']),
            system: Option.fromNullable(page.system),
        }));
}
