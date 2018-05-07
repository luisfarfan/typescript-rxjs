import {Http} from "../common/utils/http";

export interface Post {
    body: string;
    id: number;
    title: string;
}

export default class Sdk {
    private http = new Http();
    posts: Post[];

    constructor() {

    }

    init() {
        this.getData();
    }

    getData() {
        this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe(
            (response) => {
                this.posts = response.response as Post[];
                this.createPostsElements();
            }, (error) => {
                console.log(error)
            });
    }

    createPostsElements() {
        const ul = document.createElement('ul');
        const list_li = this.posts.map(v => this.drawPost(v.body)).join('');
        const postlists = document.getElementById('post-lists')
        ul.innerHTML = list_li;
        postlists.appendChild(ul);
    }

    drawPost(title: string) {
        return `<li>${title}</li>`;
    }
}