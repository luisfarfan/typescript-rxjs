export interface IPost {
    body: string;
    id: number;
    title: string;
}

export interface IComment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}