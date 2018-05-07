import {Observable} from 'rxjs';
export * from './const';

const LISTA = [1,2,3,4,5]
let multiplice = LISTA.filter(num => num > 3)
console.log(multiplice);
