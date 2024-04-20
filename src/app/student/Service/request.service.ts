import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "src/app/authentication/Service/auth.service";
import { CreateRequestRequest } from "../Model/request/create-request.request";
import { GeneralResponse } from "src/app/share/Model/general.response";
import { CreateMaterialRequest } from "../Model/response/create-material.model";

@Injectable({
    providedIn:'root'
})
export class RequestService{


    private createRequest:string = 'https://localhost:7081/api/Request';
    private checkRequestExist:string = 'https://localhost:7081/api/Request/CheckRequestExist';

    constructor(private http:HttpClient,private authServ:AuthService){}


    CreateRequest(info:CreateRequestRequest)
    {
        return this.http.post<GeneralResponse<CreateMaterialRequest>>(this.createRequest,info)
    }

    GetAllRequest(){}


    CheckRequestExist(userId:string,itemId:string)
    {
        return this.http.post<GeneralResponse<boolean>>(this.checkRequestExist,{userId,itemId});
    }
}