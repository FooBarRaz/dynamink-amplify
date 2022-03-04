export type LinkType = any;
export type Link = {
    targetSite: string;
    name: string;
    configuration: {
        value: string;
        type: LinkType;
    }
}
