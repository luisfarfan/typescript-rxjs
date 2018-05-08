import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/dom/ajax';
import {map, filter, reduce, debounce, debounceTime} from "rxjs/operators";
import {AjaxResponse} from "rxjs/internal/observable/dom/AjaxObservable";

export class Http {
    constructor(headers: Object) {

    }

    private headers = {};

    get(url: string, headers?: Object): Observable<AjaxResponse> {
        return Observable.ajax({
            url: url,
            method: 'GET',
            headers: this.validateWichHeader(headers),
        });
    }

    post(url: string, data: any, headers?: Object): Observable<AjaxResponse> {
        return Observable.ajax({
            url: url,
            method: 'POST',
            headers: this.validateWichHeader(headers),
            body: data
        });
    }

    put(url: string, data: any, headers?: Object): Observable<AjaxResponse> {
        return Observable.ajax({
            url: url,
            method: 'PUT',
            headers: this.validateWichHeader(headers),
            body: data
        });
    }

    patch(url: string, data: any, headers?: Object): Observable<AjaxResponse> {
        return Observable.ajax({
            url: url,
            method: 'PATCH',
            headers: this.validateWichHeader(headers),
            body: data
        });
    }

    delete(url: string, headers?: Object) {
        return Observable.ajax({
            url: url,
            method: 'DELETE',
            headers: this.validateWichHeader(headers),
        });
    }

    setHeaders(headers?: Object) {
        this.headers = headers;
    }

    private validateWichHeader(headers?: Object) {
        return headers ? headers : this.headers ? this.headers : null;
    }
}