export interface Blog {
    id: number,
    name: string | undefined;
    pictureUrl: string;
    categoryID: number;
    tagID: number;
    categoryName: string | undefined;
    tagName: string | undefined;
    description: BlogDescription;
}

export interface BlogParams {
    searchTerm?: string;
    pageNumber: number;
    pageSize: number;
    category: string[];
    tags: string[];
}

export interface BlogDescription {
    text: string;
}

