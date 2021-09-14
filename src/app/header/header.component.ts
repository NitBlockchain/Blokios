import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList, NgZone, ChangeDetectionStrategy, ChangeDetectorRef,Input } from "@angular/core";
import { Web3Service } from '../service/web3.service';
import {  Router, ActivatedRoute, ParamMap } from '@angular/router'

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
  $trades:any
  btcPrice:any
  constructor(private zone: NgZone,private cd: ChangeDetectorRef,public _web3: Web3Service,private route: ActivatedRoute,private router: Router) {
    this.$trades = _web3
  }

  ngOnInit(): void {

    this.trader = localStorage.getItem('trader')
    this.token = localStorage.getItem('token')
    this.avatar = localStorage.getItem('avatar')
    this.name = localStorage.getItem('name')
    console.log(this.route.snapshot)
    if(!this.name){
      this.name = 'profile'
    }
    this.start()
    setInterval(()=>{
      this.start()
    },15000)
  }

  start():void{

    // this.$trades.gPRICE(this.token,this.trader)
    //   .subscribe((jordi) => {
    //     this.btcPrice = jordi.btcPrice
    //   })

  }

  logout(){

    localStorage.clear();

    this.zone.run(()=>{

      this.cd.detectChanges();

    })

  }
}
