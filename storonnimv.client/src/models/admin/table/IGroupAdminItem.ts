import {IGroupInfo, IMember} from "../../group/IGroupInfo.ts";

export interface IGroupAdminItem {
    groupPage: IGroupInfo;
    members: IMember[];
}