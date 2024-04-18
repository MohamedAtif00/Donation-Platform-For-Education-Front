export interface GetSingleMaterialResponse{
    value:{
        id:{value:string},
        name:string,
        description:string,
        quantity:string,
        bytes:string,
        image:string,
        donationHistory:string,
        itemTypeId:{value:string},
        donorId:string
    }
}