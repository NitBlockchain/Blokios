import { Injectable } from '@angular/core';
declare var require;
const MYIN = require('../../build/artifacts/NFTEA.json');
const ABI = require('../../build/artifacts/ContractABI.json');
// import Web3 from 'web3';
let Web3 = require('web3');
let web3 = new Web3('https://bsc-dataseed.binance.org/');
import { DeviceDetectorService } from 'ngx-device-detector';
import WalletConnectProvider from "@walletconnect/web3-provider";
const provider = new WalletConnectProvider({
  rpc: {
    56: "https://bsc-dataseed1.defibit.io/",
  },
});
// let Web3 = new Web33('https://bsc-dataseed1.binance.org:443');
declare let window: any;

@Injectable({
  providedIn: 'root',
})
export class Web3Service {

  isMobile: any
  message: any
  constructor(private deviceService: DeviceDetectorService) {
    //this.storage = localStorage
    this.isMobile = this.deviceService.isMobile();

  }

  public start(): Promise<string> {

    return new Promise(async (resolve, reject) => {
      // ethereum.enable()
      provider.enable()
      .then((res:any)=>{
        window.web3 = new Web3(window.web3.currentProvider);
        provider.on("accountsChanged", (accounts: string[]) => {
          console.log(accounts);
        });

        // Subscribe to chainId change
        provider.on("chainChanged", (chainId: number) => {
          console.log(chainId);
        });

        // Subscribe to session disconnection
        provider.on("disconnect", (code: number, reason: string) => {
          console.log(code, reason);
        });

        resolve(res.toString())
      })
    })

  }


  public getBNB(account): Promise<string> {
    return new Promise(async(resolve, reject) => {

      let bal = await web3.eth.getBalance(account)
      bal = web3.utils.fromWei(bal, "ether")
      resolve(bal)
    })

  }

  public getTEA(account) {
    return new Promise((resolve) => {
      console.log(account)
      let networkId;
      web3.eth.net.getId()
        .then(async(netId: any) => {
          networkId = netId;
          const abi = ABI;
          const networkAddress = '0x229c1c803CAf6249e0F982C74BaEEd8B59615c3C';
          const nftea = await new web3.eth.Contract(abi, networkAddress);
          nftea.methods.balanceOf(account).call()
          .then((tea)=>{
            let balance = tea/1000000000
            // console.log(balance)
            resolve(balance);

          })
        });
    });
  }

  public setReflectFee(rfee: any, tfee: any) {
    return new Promise((resolve) => {
      const web3 = window.web3
      let networkId;
      web3.eth.net._reflectFee(rfee, tfee)
        .then((data: any) => {
          //console.log(data)
          //resolve(myin);
        });
    });
  }

  public convertPriceToEther(price) {
    const web3 = window.web3
    return web3.utils.toWei(price.toString(), 'Ether');
  }

  public convertEtherToPrice(price) {
    const web3 = window.web3
    return web3.utils.fromWei(price.toString(), 'Ether');
  }

  public getEtherBalance(account) {

    return new Promise((resolve) => {
      const web3 = window.web3
      const balance = web3.eth.getBalance(account)
        .then(ba => {
          resolve(web3.utils.fromWei(ba, 'Ether'));
        });
    });

  }

}
