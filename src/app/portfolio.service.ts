import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Auth } from './auth.service';
import { AuthHttp } from 'angular2-jwt';

import { Portfolio } from './portfolio';
import { PortfolioEntry } from './portfolioEntry';

@Injectable()
export class PortfolioService {

  constructor(private auth: Auth, private authHttp: AuthHttp) { }

  private portfolioUrl = 'api/portfolio';

  public getPortfolio(): Observable<Portfolio> {
    return this.authHttp.get(this.portfolioUrl)
      .map(res => res.json() as Portfolio)
      // .then(response => response.json() as Portfolio)
      .catch(this.handleError);
  }

  getPortfolioEntry(ticker: string): Observable<PortfolioEntry> {
    return this.getPortfolio()
      .map(portfolio => portfolio.entries.find(
        portfolio => portfolio.ticker === ticker));
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
