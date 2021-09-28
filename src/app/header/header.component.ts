import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList, NgZone, ChangeDetectionStrategy, ChangeDetectorRef,Input } from "@angular/core";
import { Web3Service } from '../service/web3.service';
import {  Router, ActivatedRoute, ParamMap } from '@angular/router'
const Moralis = require('moralis');

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  trader:string
  avatar:string
  name:string
  token:string
  balance:number
  web3:any
  btcPrice:any
  connected:boolean
  type:any
  constructor(private zone: NgZone,private cd: ChangeDetectorRef,public _web3: Web3Service,private route: ActivatedRoute,private router: Router) {

    this.web3 = _web3

  }

  ngOnInit(): void {

    this.trader = localStorage.getItem('trader')
    this.token = localStorage.getItem('token')
    this.avatar = localStorage.getItem('avatar')
    this.name = localStorage.getItem('name')
    this.type = this.route.snapshot.params.type
    Moralis.initialize("axLdI6l5X4qi8bOUK40FHMkaSoD5P1EL9TSGkIiy");
    Moralis.serverURL = 'https://zhnoxnior72l.moralishost.com:2053/server'
    // console.log(this.route.snapshot)

  }

  getConnect():void{

    Moralis.authenticate().then((user) =>{
      if(user){
        let address = user.get('ethAddress')
        if(address){
          this.connected = true
          console.log(user.get('ethAddress'))

        }
      }
    })
    // this.web3.start()
    // .then((res:any)=>{
    //   if(res){
    //     this.connected = true
    //     console.log(res)
    //     // this.web3.getETH(res)
    //     // .then((bal:any)=>{
    //     //   if(bal){
    //     //     console.log(bal)
    //     //   }
    //     //
    //     // })
    //   }else{
    //     console.log("not connected")
    //   }
    // })

  }

  logout(){

    localStorage.clear();

    this.zone.run(()=>{

      this.cd.detectChanges();

    })

  }
}
