import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({providedIn:'root'})
export class ApiService{

http=inject(HttpClient)
 apiUrl='https://jsonplaceholder.typicode.com/'

getData<T>(url:string):Observable<T>{
const fullUrl=`${this.apiUrl}/${url}`;
return this.http.get<T>(fullUrl)
}

}
