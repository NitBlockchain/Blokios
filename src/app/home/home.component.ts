import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList, NgZone, ChangeDetectionStrategy, ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {  Router, ActivatedRoute, ParamMap } from '@angular/router'
import {Web3Service} from '../service/web3.service';

import Swal from 'sweetalert2'
declare var $: any;

@Component({
  selector: 'home-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private api:any
  private web3:any
  balance: any;
  connected:boolean
  address:string
  accountNumber:any

  constructor(private formBuilder: FormBuilder,private _web3: Web3Service,private zone: NgZone, private cd: ChangeDetectorRef,private route: ActivatedRoute,private router: Router) {
    this.connected = false
    // this.api = _api
    this.web3 = _web3
    this.createForm()
    // localStorage.clear();


  }

  ngOnInit() {

    this.zone.run(()=>{

      this.address = localStorage.getItem('address')
      // console.log(this.token,this.user)
      // this.start()
      this.cd.detectChanges();

    })

  }

  start():void{
    // console.log("starting")

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

  private createForm() {



}

}
