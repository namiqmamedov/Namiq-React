export interface Blog {
    id: number,
    name: string | undefined;
    pictureUrl: string;
    categoryID: number;
    tagID: number;
}

export interface BlogParams {
    searchTerm?: string;
    pageNumber: number;
    pageSize: number;
    category: string[];
    tags: string[];
}

