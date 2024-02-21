export type Content = {
    [key: string]: string;
};

export type Config = {
    id: string;
    name: string;
    md5: string;
    cases: Array<string>;
    content: Content;
};

export type ConfigMappingType = {
    [key: string]: Config;
};