import {map} from "rxjs/operators";
import {Http} from "../utils/http";
import {Observable} from "rxjs/Observable";
import {IComment, IPost} from "../interfaces/post.interface";

export class PostService {
    post_number: number;
    private uriPost: string;
    private uriComments: string;

    constructor(post_number: number) {
        this.post_number = post_number;
        this.uriPost = `https://jsonplaceholder.typicode.com/posts/${this.post_number}/`;
        this.uriComments = `https://jsonplaceholder.typicode.com/posts/${this.post_number}/comments/`;
    }

    private http = new Http();

    getPost(): Observable<IPost> {
        return this.http.get(this.uriPost).pipe(map(response => response.response));
    }

    getComments(): Observable<IComment[]> {
        return this.http.get(this.uriComments).pipe(map(response => response.response));
    }
}