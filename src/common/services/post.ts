import {map} from "rxjs/operators";
import {Http} from "../utils/http";
import {Observable} from "rxjs/Observable";
import {IPost} from "../interfaces/post.interface";

export class PostService {
    private postUrl = 'https://jsonplaceholder.typicode.com/posts';
    private http = new Http();

    getPosts(): Observable<IPost[]> {
        return this.http.get(this.postUrl).pipe(map(response => response.response));
    }
}