export interface GetAllMaterialsResponse{
    value:{
        id:string,
        itemTypeId:string,
        donor:string,
        name:string,
        description:string,
        quantity:string,
        donationHistory:string,
        image:{
            bytes:string,
            fileName:string,
            contentType:string
        },
        byte:{
            bytes:string,
            fileName:string,
            contentType:string
        }

    }[]
}