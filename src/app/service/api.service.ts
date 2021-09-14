import { throwError as observableThrowError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
// import * as AWS from 'aws-sdk/global';
// import * as S3 from 'aws-sdk/clients/s3';
@Injectable({
  providedIn: 'root'
})
export class APIService {


  constructor(public http: HttpClient) {

  }

  START(token: any, user:any) {
    let DATA = {
      token: token,
      user: user,
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post('/api/START', DATA, httpOptions)
  }
  ADDCOLLECTION(token: any, user:any,title:any,description:any,category:any,sellCollection:any,allowCollab:any,localize:any,image:any,imageHash:any,collectionName:any,youtube:any,soundcloud:any,bandlab:any,story:any,royalties:any) {
    let DATA = {
      token: token,
      user: user,
      title:title,
      description:description,
      category:category,
      sellCollection:sellCollection,
      allowCollab:allowCollab,
      localize:localize,
      imageHash:imageHash,
      image:image,
      youtube:youtube,
      soundcloud:soundcloud,
      bandlab:bandlab,
      story:story,
      royalties:royalties
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post('/api/ADDCOLLECTION', DATA, httpOptions)
  }

  ADDNFT(token: any, user:any,name:any,description:any,price:any,quantity:any,image:any,imageHash:any,brewTrue:any,brewFalse:any,unlockableTrue:any,unlockableFalse:any,collection:any) {
    let DATA = {
      token: token,
      user: user,
      name:name,
      description:description,
      quantity:quantity,
      price:price,
      image:image,
      imageHash:imageHash,
      brewTrue:brewTrue,
      brewFalse:brewFalse,
      unlockableTrue:unlockableTrue,
      unlockableFalse:unlockableFalse,
      collection:collection

    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post('/api/ADDNFT', DATA, httpOptions)
  }

  bCOLLECTION(token:any,user:any,collectionName:any) {
    let DATA = {
      token:token,
      user:user,
      collectionName:collectionName
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post('/api/bCOLLECTION', DATA, httpOptions)
  }

  gCOLLECTION(collection:any) {
    let DATA = {
      collection:collection
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post('/api/gCOLLECTION', DATA, httpOptions)
  }

  SHOW(token: any, user:any,owner:any,collectionName:any) {
    let DATA = {
      token: token,
      user: user,
      owner:owner,
      collectionName:collectionName
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post('/api/SHOW', DATA, httpOptions)
  }

  ADDSTORY(token: any, user:any,collectionName:any,story:any) {
    let DATA = {
      token: token,
      user: user,
      story:story,
      collectionName:collectionName
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post('/api/ADDSTORY', DATA, httpOptions)
  }

  LOGIN(email: any, password:any) {
    let DATA = {
      email: email,
      password: password
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post('/api/LOGIN', DATA, httpOptions)
  }

  REGISTER(email: any, password:any,name:any,agree:any) {
    let DATA = {
      email: email,
      password: password,
      name:name,
      agree:agree
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post('/api/SIGNUP', DATA, httpOptions)
  }

  CONFIRMEMAIL(token: any, code:any) {
    let DATA = {
      token: token,
      code: code
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post('/api/CONFIRMEMAIL', DATA, httpOptions)
  }
  private createRequestHeader() {
  // set headers here e.g.
  let headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })
  return headers;
}

private extractData(res: Response) {
  let body = res;
  return body || {};
}

private handleError(error: Response | any) {
  let errMsg: string;
  if (error instanceof Response) {
    const err = error || '';
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.error('error  is ' + JSON.stringify(errMsg));
  return observableThrowError(errMsg);
}


}
