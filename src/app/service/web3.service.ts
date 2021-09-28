import { Injectable } from '@angular/core';
declare var require;
// const MYIN = require('../../build/artifacts/Blokios.json');
const ABI = require('../../build/artifacts/Blokios_metadata.json');
// import Web3 from 'web3';
const Moralis = require('moralis');
let Web3 = require('web3');
declare let window: any;
const web3 = new Web3(window.ethereum)
import { DeviceDetectorService } from 'ngx-device-detector';
import detectEthereumProvider from '@metamask/detect-provider'
const contract = "0x463E3e91bA0a851c25238070616F8855CaEA4bbB";
//const Testcontract = "0x75579A3B5ee0992f60b296aCBe391aA1453cD3Bc";

@Injectable({
  providedIn: 'root',
})
export class Web3Service {

  isMobile: any
  message: any
  ethereum:any
  constructor(private deviceService: DeviceDetectorService) {
    //this.storage = localStorage
    this.isMobile = this.deviceService.isMobile();

  }

  public start(): Promise<string> {

    return new Promise(async (resolve, reject) => {
      // ethereum.enable()
      const provider = await detectEthereumProvider()
      try {
        if (provider) {

          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          let currentAccount = accounts[0];
          resolve(currentAccount)

        } else {

          // if the provider is not detected, detectEthereumProvider resolves to null
          alert("please install metamask")
          //console.error('Please install MetaMask!')
          resolve()
        }

      } catch (error) {

        alert("connection canceled")
        //console.log(error)
        resolve()

      }


    })

  }


  public MINT(_uri): Promise<string>{
    return new Promise(async(resolve,reject)=>{
      try {
        //const URI:any = web3.utils.asciiToHex(_uri)
        const encodedFunction= web3.eth.abi.encodeFunctionCall({
          name:"mint",
          type:"function",
          inputs:[{
            type:'address',
            name:'account'
          },{
            type:'uint256',
            name:'amount'
          },{
            type:'bytes',
            name:'data'
          }
        ]
      },[window.ethereum.selectedAddress,1,web3.utils.asciiToHex(_uri)])

        const transactionParameters= {
          to:contract,
          from:window.ethereum.selectedAddress,
          data:encodedFunction
        }
        const txt = await window.ethereum.request({
          method:'eth_sendTransaction',
          params:[transactionParameters]
        });

        // console.log(contract)
        resolve(txt)

      } catch (error) {
        console.log(error)
        resolve(error)
      }

    })
  }
  public search(hash:any):Promise<string>{
    return new Promise(async(resolve,reject)=>{

      const options = { address: contract, chain: "0x3" };
      const NFTS = await Moralis.Web3API.token.getAllTokenIds(options);

      // const options = { chain: '0x3', address: '0x2f626fFe2c53Fcbb069c152942d5FCA05e87B272', token_address: contract };
      // const NFTS = await Moralis.Web3API.account.getNFTsForContract(options);
      //console.log(NFTS)
      resolve(NFTS)
    })
  }
  public getETH(account): Promise<string> {
    return new Promise(async(resolve, reject) => {

      let bal = await window.ethereum.getBalance(account)
      bal = window.ethereum.utils.fromWei(bal, "ether")
      resolve(bal)
    })

  }


  public convertEtherToPrice(price) {
    const web3 = window.ethereum
    return web3.utils.fromWei(price.toString(), 'Ether');
  }

  public getEtherBalance(account) {

    return new Promise((resolve) => {
      const web3 = window.ethereum
      const balance = window.ethereum.getBalance(account)
        .then(ba => {
          resolve(web3.utils.fromWei(ba, 'Ether'));
        });
    });

  }

}
