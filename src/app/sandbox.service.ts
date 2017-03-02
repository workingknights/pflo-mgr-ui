import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { AuthHttp } from 'angular2-jwt';

import { Auth } from './auth.service';
import { PortfolioEntry } from './portfolioEntry';

@Injectable()
export class SandboxService {

	constructor(private auth: Auth, private authHttp: AuthHttp) { }

  private sandboxUrl = 'api/sandbox';

  public getSandboxPortfolio(scaledMV: number): Observable<PortfolioEntry[]> {
    return this.authHttp.get(`${this.sandboxUrl}?scaledMV=${scaledMV}`)
      .map(res => res.json().entries as PortfolioEntry[])
      .catch(this.handleError);
  }

	private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
