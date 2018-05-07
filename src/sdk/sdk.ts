import {Http} from "../common/utils/http";
import {PostService} from "../common/services/post";
import {IPost} from "../common/interfaces/post.interface";

export default class Sdk {
    posts: IPost[];
    postService = new PostService();

    constructor() {

    }

    init() {
        this.getData();
    }

    getData() {
        this.postService.getPosts().subscribe((response) => {
            this.posts = response;
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