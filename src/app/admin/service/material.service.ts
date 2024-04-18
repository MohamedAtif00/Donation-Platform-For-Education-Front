import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class MatreialService{


    postCreateNewItem:string = 'https://localhost:7081/api/Item/CreateNewItem'
    getMaterialTypes:string = 'https://localhost:7081/api/ItemType/GetAll';
    getMaterials:string  ='https://localhost:7081/api/Item/GetAll'; 
    getSingleMaterial:string = 'https://localhost:7081/api/Item/GetSingleItem/';

    constructor(private http:HttpClient){}


    CreateNewItem(creationInfo:FormData)
    {
        return this.http.post<any>(this.postCreateNewItem,creationInfo);
    }

    GetAllMaterialTypes()
    {
        return this.http.get<GetAllMaterialTypeResponse>(this.getMaterialTypes);
    }

    GetAllMaterials()
    {
        return this.http.get<GetAllMaterialsResponse>(this.getMaterials);
    }

    GetSingleMaterial(id:string){
        return this.http.get<GetSingleMaterialResponse>(this.getSingleMaterial+id);
    }

}