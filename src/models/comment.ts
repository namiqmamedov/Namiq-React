export interface Comment { 
    id: number;
    text: string;
    name: string;
    email: string;
    isAccepted: boolean;
    createdAt: string;
    parentCommentId: number;
    blogID: number;
}

export interface CommentParams {
    pageNumber: number;
    pageSize: number;
}