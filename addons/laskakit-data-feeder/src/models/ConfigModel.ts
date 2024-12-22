import { Default, Property, Required } from '@tsed/schema';

export class ConfigModel {
    @Required()
    @Property(String)
    public laskaKitURL: string;

    @Property(Boolean)
    @Default(false)
    public imageToConsole?: boolean;
}
