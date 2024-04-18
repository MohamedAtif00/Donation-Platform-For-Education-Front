export interface CreateMaterialRequest{
    itemTypeId:string,
    userId:string,
    description:string,
    name:string,
    quantity:number,
    file:File,
    image:File
}