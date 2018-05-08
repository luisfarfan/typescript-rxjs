import {Http} from "../common/utils/http";
import {PostService} from "../common/services/post";
import {IComment, IPost} from "../common/interfaces/post.interface";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {fromEvent} from "rxjs";


export default class Sdk {
    post: IPost;
    comments: IComment[];
    postService = new PostService(1);
    $comments = new Subject<IComment[]>();
    $commentsDivs = new Observable<Event>();

    constructor() {
        this.$comments.subscribe(comments => {
            this.createCommentsElements();
            this.resetForm();
        });
        this.addOrEditComment();
    }

    /**
     * Metodo que inicia la aplicación
     * */
    init() {
        this.drawPost();
    }

    /**
     * Metodo que trae los POST, lo dibuja, y luego trae los comentarios para luego igual dibujarlos.
     * */

    drawPost() {
        this.postService.getPost().subscribe((response) => {
            this.post = response;
            this.createPostElement();
            this.drawComments();
        }, (error) => {
            console.log(error)
        });
    }

    /**
     * Método trae los comentarios
     * */

    drawComments() {
        this.postService.getComments().subscribe(response => {
            this.comments = response;
            this.$comments.next(this.comments);
        });
    }

    /**
     * Metodo que dibuja una lista de elementos `li` dentro de un elemento `ul`
     * */
    createPostElement() {
        const postlists = document.getElementById('post')
        postlists.innerHTML = this.htmlPost();
    }

    /**
     * HTML del POST
     * @return {string} Elemento HTML en string
     * */

    htmlPost() {
        const post = this.post;
        return `<h4 class="alert-heading">${post.title}</h4><p>${post.body}</p>`
    }

    /**
     *
     * */

    createCommentsElements() {
        const commentsHtml = this.comments.map(c => this.htmlComment(c)).join('');
        const commentsList = document.getElementById('comments');
        commentsList.innerHTML = commentsHtml;
        this.listenClickDivsCard();
    }

    /**
     * Método que devuelve el HTML del comentario
     * @return {string} Elemento HTML en string
     * */

    htmlComment(comment: IComment) {
        return `<div id="${comment.id}" class="card" style="width: 18rem;">
                  <div class="card-body">
                    <h5 class="card-title">${comment.name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">CommentID: ${comment.id}</h6>
                    <p class="card-text">${comment.body}</p>
                  </div>
                </div>`;
    }

    /**
     * Método que crea un observable de un elemento HTML, para luego escuchar su evento `CLICK`
     * */

    addOrEditComment() {
        const button = document.getElementById('btn_comment');
        var obsButton = fromEvent(button, 'click');
        obsButton.subscribe(() => {
            this.__addOrEditComment();
        });
    }

    __addOrEditComment() {
        const editoradd = (<HTMLInputElement>document.getElementById('input-id')).value;
        const comment = this.getCommentFromFrom();
        if (editoradd != '') {
            const idComment = this.comments.findIndex((c) => c.id === comment.id);
            this.comments[idComment] = comment;
            this.$comments.next(this.comments);
        } else {
            this.comments.push(comment);
            this.$comments.next(this.comments);
        }
    }

    getCommentFromFrom(): IComment {
        const email = (<HTMLInputElement>document.getElementById('input-email')).value;
        const name = (<HTMLInputElement>document.getElementById('input-name')).value;
        const body = (<HTMLInputElement>document.getElementById('input-body')).value;
        const id = (<HTMLInputElement>document.getElementById('input-id')).value;
        let $id = id;
        if (id == '') {
            $id = `${this.comments.length + 1}`;
        }
        return {email: email, name: name, body: body, postId: 1, id: Number($id)};
    }

    setCommentToCard(idCard: string) {
        const comment = this.comments.find(c => c.id === Number(idCard));
        (<HTMLInputElement>document.getElementById('input-email')).value = comment.email;
        (<HTMLInputElement>document.getElementById('input-name')).value = comment.name;
        (<HTMLInputElement>document.getElementById('input-body')).value = comment.body;
        (<HTMLInputElement>document.getElementById('input-id')).value = `${comment.id}`;
    }

    listenClickDivsCard() {
        const divCard = document.getElementsByClassName('card');
        this.$commentsDivs = fromEvent(divCard, 'click');
        this.$commentsDivs.subscribe((e: MouseEvent) => {
            this.setCommentToCard(this.getDivCard(e).id);
        });
    }

    getDivCard(e: any) {
        return e.path.find((p: any) => p.className === 'card');
    }

    resetForm() {
        (<HTMLFormElement>document.getElementById("form")).reset();
        (<HTMLInputElement>document.getElementById('input-id')).value = '';
    }
}