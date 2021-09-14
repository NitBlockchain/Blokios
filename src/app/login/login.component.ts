import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList, NgZone, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {  Router, ActivatedRoute, ParamMap } from '@angular/router'
import { Web3Service } from '../service/web3.service';
import { APIService } from '../service/api.service';
import Swal from 'sweetalert2'
import * as fleekStorage from '@fleekhq/fleek-storage-js'
import { NgxSummernoteModule } from 'ngx-summernote';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  token:any
  showLogin:boolean
  showRegister:boolean
  showConfirm:boolean
  _login: FormGroup
  _register: FormGroup
  _confirm: FormGroup
  api:any
  type:any

  constructor(private formBuilder: FormBuilder, private _api: APIService, private web3: Web3Service, private zone: NgZone, private cd: ChangeDetectorRef,private route: ActivatedRoute,private router: Router) {

    this.api = _api
    this.createForm()

  }

  ngOnInit() {

    this.type = this.route.snapshot.params.type
    if(this.type=='register'){
      this.showRegister = true
      this.showLogin = false
      this.showConfirm = false
    }else if(this.type=='login'){
      this.showRegister = false
      this.showLogin = true
      this.showConfirm = false
    }else if(this.type=='confirm'){
      this.showRegister = false
      this.showLogin = false
      this.showConfirm = true
    }


  }

  login():void{
    console.log("working")
    if (!this._login.controls.email.value) {
  Swal.fire({
    title: 'Error!',
    text: 'Whats your email?',
    icon: 'error',
    confirmButtonText: 'Close'
  })
} else if (!this._login.controls.password.value) {

  Swal.fire({
    title: 'Error!',
    text: 'Whats your password?',
    icon: 'error',
    confirmButtonText: 'Close'
  })
} else {

  this.api.LOGIN(this._login.controls.email.value,this._login.controls.password.value)
  .subscribe((jordi:any)=>{
    if(jordi.success){

      localStorage.setItem('token',jordi.token)
      localStorage.setItem('user',jordi.user)
      this.showLogin =false
      this.pop('success',jordi.message)
      this.router.navigate(['/collection/'+jordi.name]);

    }else{

      if(jordi.verifyEmail>0){

        this.showConfirm = true
        this.showLogin = false
        this.type= 'confirm'
        localStorage.setItem('token',jordi.token)
        this.pop('error',jordi.message)

      }else{
        this.pop('error',jordi.message)

      }


    }
  })
}

  }

  register():void{

    if (!this._register.controls.name.value) {
  Swal.fire({
    title: 'Error!',
    text: 'Whats your user name?',
    icon: 'error',
    confirmButtonText: 'Close'
  })
} else if (!this._register.controls.email.value) {

  Swal.fire({
    title: 'Error!',
    text: 'Whats your email?',
    icon: 'error',
    confirmButtonText: 'Close'
  })
}else if (!this._register.controls.password.value) {

  Swal.fire({
    title: 'Error!',
    text: 'Whats your user name?',
    icon: 'error',
    confirmButtonText: 'Close'
  })
} else {

    this.api.REGISTER(this._register.controls.email.value,this._register.controls.password.value,this._register.controls.name.value,this._register.controls.agree.value)
    .subscribe((jordi:any)=>{
      if(jordi.success){

        this.token = jordi.token
        localStorage.setItem('token',jordi.token)
        localStorage.setItem('user',jordi.user)
        this.showConfirm = true;
        this.showRegister = false
        this.type= 'confirm'
        this.pop('success',jordi.message)
        // this.router.navigate(['/create']);

      }else{

        this.pop('error',jordi.message)

      }

    })
  }
  }

  confirm():void{

    if (!this._confirm.controls.code.value) {
  Swal.fire({
    title: 'Error!',
    text: 'Whats the code?',
    icon: 'error',
    confirmButtonText: 'Close'
  })
} else{

  let Token = localStorage.getItem('token')
  console.log("token is " + Token)

  this.api.CONFIRMEMAIL(Token,this._confirm.controls.code.value)
  .subscribe((jordi:any)=>{
    if(jordi.success){
      this.showConfirm = false
      this.pop('success',jordi.message)
    }else{
      this.pop('error',jordi.message)

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

  this._login = this.formBuilder.group({

    email: ['', Validators.required],
    password: ['', Validators.required],

  });

  this._confirm = this.formBuilder.group({

    code: ['', Validators.required],

  });

  this._register = this.formBuilder.group({

    email: ['', Validators.required],
    password: ['', Validators.required],
    name: ['', Validators.required],
    agree: ['', Validators.required],

  });

}

}
