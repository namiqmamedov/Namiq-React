export interface Blog {
    id: number,
    name: string;
    pictureUrl: string;
}

export interface BlogParams {
    pageNumber: number;
    pageSize: number;
}