import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class RequestService{


    getAllRequest:string = 'https://localhost:7081/api/Request/GetAll';

    constructor(private http:HttpClient){}

    GetAllRequest(){
        return this.http.get<any>(this.getAllRequest);
    }
}