import {Http} from "../common/utils/http";

export class Sdk {
    private http = new Http();

    constructor() {

    }

    getData() {
        this.http.get('https://sky.com/card/')
    }
}