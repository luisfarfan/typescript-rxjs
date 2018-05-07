import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/dom/ajax';
import {map, filter, reduce, debounce, debounceTime} from "rxjs/operators";
import {AjaxResponse} from "rxjs/internal/observable/dom/AjaxObservable";

export class Http {
    constructor() {

    }

    private headers = {};

    get(url: string): Observable<AjaxResponse> {
        return Observable.ajax(url);
    }

    post(url: string, data: any): Observable<AjaxResponse> {
        return Observable.ajax({
            url: url,
            method: 'POST',
            headers: this.headers,
            body: data
        });
    }

    put(url: string, data: any): Observable<AjaxResponse> {
        return Observable.ajax({
            url: url,
            method: 'PUT',
            headers: this.headers,
            body: data
        });
    }

    patch(url: string, data: any): Observable<AjaxResponse> {
        return Observable.ajax({
            url: url,
            method: 'PATCH',
            headers: this.headers,
            body: data
        });
    }

    delete(url: string) {
        return Observable.ajax({
            url: url,
            method: 'DELETE',
            headers: this.headers,
        });
    }

    setHeaders(headers: {}) {
        this.headers = headers;
    }

    setToken(token: string) {

    }
}