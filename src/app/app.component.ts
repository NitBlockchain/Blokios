import {ChangeDetectorRef, Component, HostListener, OnInit} from '@angular/core';
import {Web3Service} from './service/web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private web3: Web3Service, private cd: ChangeDetectorRef) {

  }

  ngOnInit() {
  }

}
