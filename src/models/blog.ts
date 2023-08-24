export interface Blog {
    id: number,
    name: string | undefined;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    pictureUrl: string;
    categoryID: number;
    tagID: number;
    categoryName: string | undefined;
    tagName: string | undefined;
    description: BlogDescription;
    blogTags: BlogTag[];
    category: {
        name: string;
    }
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

export interface BlogTag {
    id: number;
    blogID: number;
    tagID: number;
}

