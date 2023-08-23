export interface Category {
    id: number,
    name: string | undefined;
}

export interface CategoryParams {
    pageNumber: number;
    pageSize: number;
}