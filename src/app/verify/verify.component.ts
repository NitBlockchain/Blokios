import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList, NgZone, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {  Router, ActivatedRoute, ParamMap } from '@angular/router'
import { Web3Service } from '../service/web3.service';
import { APIService } from '../service/api.service';
import Swal from 'sweetalert2'
import * as fleekStorage from '@fleekhq/fleek-storage-js'
import { NgxSummernoteModule } from 'ngx-summernote';

const Moralis = require('moralis');
declare var $: any;


@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  token:any
  api:any
  _verify: FormGroup
  uuid:any
  vendor:any
  snap:any
  product:any
  IDTOUSE:any
  VENDORTOUSE:any

  constructor(private formBuilder: FormBuilder, private _api: APIService, private web3: Web3Service, private zone: NgZone, private cd: ChangeDetectorRef,private route: ActivatedRoute,private router: Router) {

    this.api = _api
    this.createForm()

  }

  ngOnInit() {

    this.uuid  = this.route.snapshot.queryParams.uid
    this.snap = this.route.snapshot
    this.vendor = this.snap._urlSegment.segments[1].path
    console.log(this.vendor)
    //console.log(this.route.snapshot._urlSegment.segments[1].path)
    // console.log(this.route.snapshot.queryParams.uid)

    if(this.uuid && this.vendor){

      this.IDTOUSE = this.uuid
      this.VENDORTOUSE = this.vendor
      this.verify()
    }
  }

async verify(){

console.log("verifying")

if (!this._verify.controls.uuid.value && !this.uuid) {

  Swal.fire({
    title: 'Error!',
    text: 'Whats the uuid?',
    icon: 'error',
    confirmButtonText: 'Close'
  })
}else if(!this._verify.controls.vendor.value && !this.vendor){

  Swal.fire({
    title: 'Error!',
    text: 'Whats the manufacture/vendor?',
    icon: 'error',
    confirmButtonText: 'Close'
  })

} else {

  if(this._verify.controls.uuid.value && this._verify.controls.vendor.value){
    this.IDTOUSE = this._verify.controls.uuid.value
    this.VENDORTOUSE = this._verify.controls.vendor.value
  }

  this.api.VERIFY(this.IDTOUSE,this.VENDORTOUSE)
  .subscribe(async(jordi:any)=>{
    if(jordi.success){

      this.zone.run(()=>{

        this.product = jordi.metaData

      })

    }else{

      this.pop('error',jordi.message)
    }
  })


  // .subscribe((jordi:any)=>{
  //   console.log(jordi)
  // })

  // const txt = await this.mintToken(metaDataURI)
  // .then((res:any)=>{
  //   console.log(res)
  // })

  // console.log(imageURI)
    // this.api.CREATE(this._create.controls.category.value,this._create.controls.title.value,this._create.controls.brand.value,this._create.controls.manufacturer.value,this._create.controls.uuid.value,this._create.controls.description.value,this.collectionImage,this.collectionImageHash)
    // .subscribe((jordi:any)=>{
    //   if(jordi.success){
    //
    //     this.pop('success',jordi.message)
    //     //this.router.navigate(['/collection/'+jordi.name]);
    //
    //   }else{
    //
    //     this.pop('error',jordi.message)
    //   }
    // })
  }
}

  private pop(type,message){
    let title;
    if(type=='error'){
      title = 'Error!'
    }else{
      title = 'Success!'
    }

    Swal.fire({
      title: title,
      text: message,
      icon: type,
      confirmButtonText: 'Close'
    })
  }

createForm(){

  this._verify = this.formBuilder.group({

    uuid: ['', Validators.required],
    vendor: ['', Validators.required],

  });

}

}
