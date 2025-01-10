import {INewsShortItem} from "./INewsShortItem";

export interface IPaginationNewsResponse {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    shortNews: INewsShortItem[];
}