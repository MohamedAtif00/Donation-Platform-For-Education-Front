import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CreateMaterialRequest } from "../Model/request/create-material-reques.model";
import {  GetAllMaterialTypeResponse } from "../Model/response/get-all-material-types.response";
import { GetAllMaterialsResponse } from "../Model/response/get-all-materials.response";
import { GetSingleMaterialResponse } from "../Model/response/get-single-material.model";
import { GetSingleMaterialTypeResponse } from "../Model/response/get-single-material-type.response";

@Injectable({
    providedIn:'root'
})
export class MatreialService{


    postCreateNewItem:string = 'https://localhost:7081/api/Item/CreateNewItem'
    getMaterialTypes:string = 'https://localhost:7081/api/ItemType/GetAll';
    getSingleType:string = 'https://localhost:7081/api/ItemType/GetSingleItemType/'
    getMaterials:string  ='https://localhost:7081/api/Item/GetAll'; 
    getSingleMaterial:string = 'https://localhost:7081/api/Item/GetSingleItem/';
    getMaterialsForType:string = 'https://localhost:7081/api/Item/GetItemsForType/'
    dwonloadFile:string = 'https://localhost:7081/api/Item/GetPdf/';

    constructor(private http:HttpClient){}


    CreateNewItem(creationInfo:FormData)
    {
        return this.http.post<any>(this.postCreateNewItem,creationInfo);
    }

    GetAllMaterialTypes()
    {
        return this.http.get<GetAllMaterialTypeResponse>(this.getMaterialTypes);
    }

    GetSingleType(id:string)
    {
        return this.http.get<GetSingleMaterialTypeResponse>(this.getSingleType+id)
    }

    GetAllMaterials()
    {
        return this.http.get<GetAllMaterialsResponse>(this.getMaterials);
    }

    GetMaterialsForType(id:string)
    {
        return this.http.get<GetAllMaterialsResponse>(this.getMaterialsForType+id);
    }

    GetSingleMaterial(id:string){
        return this.http.get<GetSingleMaterialResponse>(this.getSingleMaterial+id);
    }

    DownloadFile(id:string)
    {
        return this.http.get(this.dwonloadFile+id,{responseType:'blob'})
    }

}