import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatreialService } from '../../Service/material.service';
import { MaterialModel } from '../../Model/material.model';

interface MatirialView{
  id:string,
  itemTypeId:string,
  donor:string,
  name:string,
  description:string,
  quantity:string,
  donationHistory:{day:number, month:number, year:number},
  image:string,
  byte:string
}

@Component({
  selector: 'app-material-details',
  templateUrl: './material-details.component.html',
  styleUrls: ['./material-details.component.css']
})
export class MaterialDetailsComponent implements OnInit{


  material!:MaterialModel;
  materialView!:MatirialView;

  constructor(private route:ActivatedRoute,private materialServ:MatreialService){}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params['id']);
      this.materialServ.GetSingleMaterial(params['id']).subscribe(data=>{
        console.log(data);
        let dt = data.value


        // this.material={id:dt.id.value,
        //               itemTypeId:dt.itemTypeId.value,
        //               donor:dt.donorId,name:dt.name,
        //               description:dt.description,
        //               quantity:dt.quantity,
        //               donationHistory:dt.donationHistory,
        //               image:{bytes:dt.image,fileName:dt.name,contentType:'image/jpeg'},
        //               byte:{bytes:dt.bytes,fileName:dt.name,contentType:'application/pdf'}};
        var dateTime = new Date(dt.donationHistory);
        this.materialView = {id:dt.id.value,
                            itemTypeId:dt.itemTypeId.value,
                            donor:dt.donorId,name:dt.name,
                            description:dt.description,
                            quantity:dt.quantity,
                            donationHistory:{day:dateTime.getDay(),month:dateTime.getMonth(),year:dateTime.getFullYear()},
                            image:this.ConvertToUrl(dt.image,'image/jpeg'),
                            byte:''}
      })


    })
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

  // GetType(id: string): string {
  //   let typeName = '';
  //   this.materialsType.forEach(e => {
  //     if (e.id.value === id) {
  //       typeName = e.name;
  //       return;
  //     }
  //   });
  //   return typeName;
  // }




}
