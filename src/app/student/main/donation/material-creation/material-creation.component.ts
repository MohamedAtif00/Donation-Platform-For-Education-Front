import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, catchError, of } from 'rxjs';
import { AuthService } from 'src/app/authentication/Service/auth.service';
import { MaterialTypeModel } from 'src/app/student/Model/material-type.model';
import { CreateMaterialRequest } from 'src/app/student/Model/request/create-material-reques.model';
import { MatreialService } from 'src/app/student/Service/material.service';

@Component({
  selector: 'app-material-creation',
  templateUrl: './material-creation.component.html',
  styleUrls: ['./material-creation.component.css']
})
export class MaterialCreationComponent {

  info!:CreateMaterialRequest;
  image!:File;
  pdfFile!:File;



  pdf:boolean = false;
  selectValue!:string;

  materialTypes!:MaterialTypeModel[];
  formCreation!:FormGroup;

  constructor(private authServ:AuthService,private router:Router,private materialServ:MatreialService){}


  ngOnInit(): void {
    this.materialServ.GetAllMaterialTypes().subscribe(data=>{
      this.materialTypes = data.value
      console.log(this.materialTypes);
      
    });

    this.formCreation = new FormGroup
    (
        {
          name: new FormControl('', [Validators.required]),
          description: new FormControl('', [Validators.required]),
          pdfFile: new FormControl(''),
          quantity: new FormControl(''),
          imageFile: new FormControl('', [Validators.required])
        }
    );
  }


    //   CheckUsername():AsyncValidatorFn
    //   {
    //     return (AbstractControl):Observable<ValidationErrors|null> =>{
    //       let username = this.formCreation.controls['username'].value;
    //       return this.authServ.CheckUsrname(username).pipe(
    //         map((data)=>{
    //           console.log(data);
              
    //           return data?{nameTaken:true}: null
    //         }),
    //         catchError(() => of(null))
    //       );
    //     }
    // }


    // ----------------------------------------------------------------
    // item type select
    selected(event: any) {
      this.selectValue = event.target.value;
      console.log('Selected value:', this.selectValue);
      
      // Iterate over the materialTypes array
      this.materialTypes.forEach(e => {
        if (e.id.value === this.selectValue) {
          console.log('Selected material:', e.name);
          if (e.name === 'pdf and books') {
            this.pdf = true; // Set pdf to true if the selected material is 'pdf and books'
          } else {
            this.pdf = false; // Set pdf to false otherwise
          }
        }
      });

      console.log('pdf:', this.pdf);
    }

    // ----------------------------------------------------------------
    // file selected in case pdf
    FileSelected(event:any)
    {
      this.pdfFile = event.target.files[0];
      console.log(this.image);
    }

    imageSelected(eent:any){
      this.image = eent.target.files[0];
      //console.log(this.info.image);
    }

    submitForm(event:any) {
      event.preventDefault();
      //if (this.registerFor) {
        console.log(this.formCreation);
        // Perform form submission logic here
      //}

      this.info ={
        userId:this.authServ.user.id,
        itemTypeId:this.selectValue,
        name:this.formCreation.controls['name'].value,
        description:this.formCreation.controls['description'].value,
        file:this.pdfFile??  null,
        quantity:this.formCreation.controls['quantity'].value,
        image:this.image
      }
      console.log(this.info);
      
      let formInfo = new FormData();
      formInfo.append('itemTypeId', this.info.itemTypeId);
      formInfo.append('userId', this.info.userId);
      formInfo.append('name', this.info.name);
      formInfo.append('description', this.info.description);

      if(this.pdfFile)
        formInfo.append('file', this.pdfFile,this.pdfFile.name);

      formInfo.append('quantity', this.info.quantity.toString()); 
      formInfo.append('image', this.image,this.image.name); 

      if(this.formCreation.valid)
      {
        this.materialServ.CreateNewItem(formInfo).subscribe((data)=>{

          console.log(data);

          if(data.value) 
            this.router.navigate(['']);

        });
      } 



    }


}
