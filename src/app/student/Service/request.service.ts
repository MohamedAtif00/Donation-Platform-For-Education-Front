import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "src/app/authentication/Service/auth.service";
import { CreateRequestRequest } from "../Model/request/create-request.request";

@Injectable({
    providedIn:'root'
})
export class RequestService{


    createRequest:string = 'https://localhost:7081/api/Request';

    constructor(private http:HttpClient,private authServ:AuthService){}


    CreateRequest(info:CreateRequestRequest)
    {
        return this.http.post<any>(this.createRequest,info)
    }
}