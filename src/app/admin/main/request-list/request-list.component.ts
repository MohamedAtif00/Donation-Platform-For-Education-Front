import { Component, OnInit } from '@angular/core';
import { RequestModels } from '../../model/request.model';
import { RequestService } from '../../service/request.service';
import { MaterialModel } from '../../model/material.model';


@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit{


  request!:RequestModels[];
  modelObject!:{username:string,email:string,itemName:string}[];

  constructor(private requestServ:RequestService){}


  ngOnInit(): void {
    this.requestServ.GetAllRequest().subscribe(data=>{
      this.request=data;
      console.log(this.request);
      this.modelObject = data.value




    });





  }




}
