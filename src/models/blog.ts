export interface Blog {
    id: number,
    name: string;
    pictureUrl: string;
    categoryID: number;
}

export interface BlogParams {
    pageNumber: number;
    pageSize: number;
    category: string[];
}