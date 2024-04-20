import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatreialService } from '../../Service/material.service';
import { MaterialModel } from '../../Model/material.model';
import { RequestService } from '../../Service/request.service';
import { AuthService } from 'src/app/authentication/Service/auth.service';

interface MatirialView{
  id:string,
  itemTypeId:string,
  donor:string,
  name:string,
  description:string,
  quantity:string,
  donationHistory:{day:number, month:number, year:number},
  image:string,
  byte:string,
  donorName:string
}

@Component({
  selector: 'app-material-details',
  templateUrl: './material-details.component.html',
  styleUrls: ['./material-details.component.css']
})
export class MaterialDetailsComponent implements OnInit{


  material!:MaterialModel;
  materialView!:MatirialView;
  requestExist!:boolean;
  isPdf!:boolean;

  constructor(private route:ActivatedRoute,private router:Router,private authServ:AuthService,private materialServ:MatreialService,private requestServ:RequestService){}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params['id']);
      this.materialServ.GetSingleMaterial(params['id']).subscribe(data=>{
        console.log(data);
        let dt = data.value
      
        //console.log(this.authServ.user.id +''+this.materialView.id);
        
        // this.material={id:dt.id.value,
        //               itemTypeId:dt.itemTypeId.value,
        //               donor:dt.donorId,name:dt.name,
        //               description:dt.description,
        //               quantity:dt.quantity,
        //               donationHistory:dt.donationHistory,
        //               image:{bytes:dt.image,fileName:dt.name,contentType:'image/jpeg'},
        //               byte:{bytes:dt.bytes,fileName:dt.name,contentType:'application/pdf'}};

        



        var dateTime = new Date(dt.donationHistory);
            this.materialView = {
              id: dt.itemId,
              itemTypeId: dt.itemTypeId,
              donor: dt.donorId,
              name: dt.name,
              description: dt.description,
              quantity: dt.quantity,
              donationHistory: {
                day: dateTime.getDate(), // Use getDate() to get the day of the month
                month: dateTime.getMonth() + 1, // Add 1 to get the actual month number
                year: dateTime.getFullYear()
              },
              image: this.ConvertToUrl(dt.image, 'image/jpeg'),
              byte: '',
              donorName: dt.userName
            };


        this.requestServ.CheckRequestExist(this.authServ.user.id,this.materialView.id).subscribe(data=>{
          if(data.value)
            this.requestExist = data.value;
          console.log(this.requestExist);
        })

        this.materialServ.GetSingleType(dt.itemTypeId).subscribe(data=>{
          if(data.value.name.includes('pdf'))
          {
            this.isPdf = true;
          }else{
            this.isPdf = false;
          }
        })
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

  OrderCreated()
  {
    if(!this.authServ.user || this.authServ.user.role != 'Student') 
    {
      this.router.navigate(['auth','login']);
      return
    }else(this.authServ.user && this.authServ.user.role == 'Student')
    {
      this.requestServ.CreateRequest({userId:this.authServ.user.id,itemId:this.materialView.id}).subscribe(data=>{
        console.log(data);
        if(data.value)
        {
          alert('orderCreated');
        }else{
          alert(data.errors[0])
        }
        
      });

    }
  }

  DownloadPDF()
  {
      this.materialServ.DownloadFile(this.materialView.id).subscribe((response: Blob) => {
        // Create a blob URL for the downloaded file
        const blobUrl = window.URL.createObjectURL(response);
        
        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'filename.pdf'; // Set the desired filename here
        link.click();
  
        // Clean up by revoking the blob URL
        window.URL.revokeObjectURL(blobUrl);
      });
  }


}
