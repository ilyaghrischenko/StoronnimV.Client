export interface IMember {
    id: number;
    photoUrl: string;
    fullName: string;
    role: string;
}

export interface IGroupInfo {
    id: number;
    photoUrl: string;
    description: string;
}

export interface IGroupPageFullInfo {
    groupPage: IGroupInfo;
    members: IMember[];
}
