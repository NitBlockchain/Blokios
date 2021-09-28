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
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  token:any
  api:any
  _create: FormGroup
  toFile:any
  type:any
  collectionImage:any
  collectionImageHash:any
  imageURI:any
  imageName:any
  imageURL:any
  connected:boolean

  constructor(private formBuilder: FormBuilder, private _api: APIService, private web3: Web3Service, private zone: NgZone, private cd: ChangeDetectorRef,private route: ActivatedRoute,private router: Router) {

    this.api = _api
    this.createForm()

  }

  ngOnInit() {

    this.type = this.route.snapshot.params.type
    Moralis.initialize("axLdI6l5X4qi8bOUK40FHMkaSoD5P1EL9TSGkIiy");
    Moralis.serverURL = 'https://zhnoxnior72l.moralishost.com:2053/server'
  }

  async upload(event:any){


    this.toFile = event.target.files[0]
    const imageFile = new Moralis.File(this.toFile.name,this.toFile)
    await imageFile.saveIPFS();
    this.imageURI= await imageFile.ipfs();
    this.zone.run(()=>{
    this.imageURL = this.imageURI
    this.imageName = this.toFile.name
    // console.log(this.imageURI)
  })

  }

  getConnect():void{

    Moralis.authenticate().then((user) =>{
      if(user){
        let address = user.get('ethAddress')
        if(address){

          this.connected = true

        }
      }
    })


  }
async create(){

if (!this._create.controls.category.value) {
  Swal.fire({
    title: 'Error!',
    text: 'Whats the category?',
    icon: 'error',
    confirmButtonText: 'Close'
  })
} else if (!this._create.controls.title.value) {

  Swal.fire({
    title: 'Error!',
    text: 'Whats the title?',
    icon: 'error',
    confirmButtonText: 'Close'
  })

}else if (!this._create.controls.brand.value) {

  Swal.fire({
    title: 'Error!',
    text: 'Whats the brand?',
    icon: 'error',
    confirmButtonText: 'Close'
  })

} else if (!this._create.controls.manufacturer.value) {

  Swal.fire({
    title: 'Error!',
    text: 'Whats the manufacturer?',
    icon: 'error',
    confirmButtonText: 'Close'
  })

}else if (!this._create.controls.uuid.value) {

  Swal.fire({
    title: 'Error!',
    text: 'Whats the uuid?',
    icon: 'error',
    confirmButtonText: 'Close'
  })

}else if (!this._create.controls.description.value) {

  Swal.fire({
    title: 'Error!',
    text: 'Whats the description?',
    icon: 'error',
    confirmButtonText: 'Close'
  })

}else {

  this.api.HASH(this._create.controls.uuid.value,this._create.controls.manufacturer.value)
  .subscribe(async(jordi:any)=>{
    if(jordi.success){

      const metaData = {
        category:this._create.controls.category.value,
        title:this._create.controls.title.value,
        brand: this._create.controls.brand.value,
        manufacturer:this._create.controls.manufacturer.value,
        blokios_verifier:jordi.hash,
        description:this._create.controls.description.value,
        image:this.imageURI

      }
      console.log('hash = ' + jordi.hash)

      const metaDataFile = new Moralis.File("metadata.json", {base64 : btoa(JSON.stringify(metaData))});
      await metaDataFile.saveIPFS()
      const metaDataURI = await metaDataFile.ipfs()
      console.log(metaDataURI)
      this.web3.MINT(metaDataURI)
      .then((res:any)=>{
        console.log("storing to db")
        this.api.STORE(res,jordi.hash,metaDataURI)
        .subscribe((msg:any)=>{

          this.pop('success','nft created txid = ' + res)

        })
      })
    }else{

      this.pop('error','error creating hash, try again')
    }
  })

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

  this._create = this.formBuilder.group({

    category: ['', Validators.required],
    title: ['', Validators.required],
    brand: ['', Validators.required],
    manufacturer: ['', Validators.required],
    uuid: ['', Validators.required],
    description: ['', Validators.required],

  });

}

}
