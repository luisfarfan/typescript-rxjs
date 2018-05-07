import {Http} from "../common/utils/http";

export default class Sdk {
    private http = new Http();

    constructor() {

    }

    init() {

    }

    getData() {
        this.http.get('https://sky.com/card/')
    }
}