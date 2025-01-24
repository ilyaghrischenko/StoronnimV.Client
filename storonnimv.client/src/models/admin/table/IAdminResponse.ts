export enum ItemsType {
    News = 'news',
    Schedules = 'schedules',
    Videos = 'videos',
    Music = 'music',
    Group = 'group'
}

export interface IAdminResponse<T> {
    type: ItemsType;
    items: T[];
}