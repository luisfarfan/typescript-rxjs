import {Http} from "../common/utils/http";
import {PostService} from "../common/services/post";
import {IPost} from "../common/interfaces/post.interface";

export default class Sdk {
    posts: IPost[];
    postService = new PostService();

    constructor() {

    }

    /**
     * Método que inicia la aplicación
     * */
    init() {
        this.getData();
    }

    /**
     * Metodo que trae la lista de POSTS, y cuando los POSTS esten listos, dibujara los elementos
     * */
    getData() {
        this.postService.getPosts().subscribe((response) => {
            this.posts = response;
            this.createPostsElements();
        }, (error) => {
            console.log(error)
        });
    }

    /**
     * Metodo que dibuja una lista de elementos `li` dentro de un elemento `ul`
     * */
    createPostsElements() {
        const ul = document.createElement('ul');
        const list_li = this.posts.map(v => this.drawPost(v.body)).join('');
        const postlists = document.getElementById('post-lists')
        ul.innerHTML = list_li;
        postlists.appendChild(ul);
    }

    /**
     * Metodo que devuelve un li con el string de envio
     * @param: title texto que ira dentro del `li`
     * @return: string elemento HTML li
     * */
    drawPost(title: string) {
        return `<li>${title}</li>`;
    }
}