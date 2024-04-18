import { Component, OnInit } from '@angular/core';
import { MatreialService } from '../../Service/material.service';
import { MaterialTypeModel } from '../../Model/material-type.model';
import { MaterialModel } from '../../Model/material.model';

interface MaterialView{
  id:string,
    itemType:string,
    donor:string,
    name:string,
    description:string,
    quantity:string,
    image:string
}

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.css']
})
export class MaterialListComponent implements OnInit{


  materialsType!:MaterialTypeModel[];
  materials!:MaterialModel[];
  materialsView:MaterialView[] = [];

  constructor(private materialServ:MatreialService){}


  ngOnInit(): void {
    this.materialServ.GetAllMaterialTypes().subscribe(data=>{
      this.materialsType = data.value;
      console.log(this.materialsType);
      
    });

    this.materialServ.GetAllMaterials().subscribe(data=>{
      this.materials  =data.value
      console.log(this.materials);

      this.materials.forEach(data=>{
        this.materialsView.push({id:data.id,itemType:this.GetType(data.itemTypeId),donor:data.donor,name:data.name,description:data.description,quantity:data.quantity,image:data.image?this.ConvertToUrl(data.image.bytes,data.image.contentType):''})
      })
      
    });

  }

  base64toBlob(base64: string, contentType: string): Blob {
    const sliceSize = 512;
    const byteCharacters = atob(base64);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    return new Blob(byteArrays, { type: contentType });
  }

  // Assuming your data is stored in 'response' variable
  ConvertToUrl(base64: string, contentType: string)
  {
    const imageBlob = this.base64toBlob(base64, contentType);
    const imageUrl = URL.createObjectURL(imageBlob);
    return imageUrl;
  }

  GetType(id: string): string {
    let typeName = '';
    this.materialsType.forEach(e => {
      if (e.id.value === id) {
        typeName = e.name;
        return;
      }
    });
    return typeName;
  }
  

}
