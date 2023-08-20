export interface Blog {
    id: number,
    name: string | undefined;
    pictureUrl: string;
    categoryID: number;
    tagID: number;
    categoryName: string | undefined;
    tagName: string | undefined;
    text: string | undefined;
}

export interface BlogParams {
    searchTerm?: string;
    pageNumber: number;
    pageSize: number;
    category: string[];
    tags: string[];
}

