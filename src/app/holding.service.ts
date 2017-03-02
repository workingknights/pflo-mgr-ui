import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AuthHttp } from 'angular2-jwt';

import { Auth } from './auth.service';
import { Holding } from './holding';
import { Utils } from './utils';

@Injectable()
export class HoldingService {

  constructor(
    private auth: Auth,
    private authHttp: AuthHttp,
    private utils: Utils
  ) { }

  private holdingsUrl = 'api/holding';

  public getHoldings(): Observable<Holding[]> {
    return this.authHttp.get(this.holdingsUrl)
      .map(response => response.json().data as Holding[])
      .catch(this.handleError);
  }

  public getHolding(id: string): Observable<Holding> {
    return this.getHoldings()
      .map(holdings => holdings.find(holding => holding.id === id));
  }

  public create(holding: Holding): Observable<Holding> {
    console.log('HoldingService:create() json=' + JSON.stringify(holding));
    return this.authHttp.post(this.holdingsUrl, holding)
		.flatMap((res: Response) => {
			let location = res.headers.get('Location');
			return this.authHttp.get(location);
		})
		.map((res: Response) => res.json())
		.catch(this.utils.handleError);
  }

  public updateHolding(holding: Holding): Observable<Holding> {
		console.log('HoldingService:updateHolding() json=' + JSON.stringify(holding));

		const url = `${this.holdingsUrl}/${holding.id}`;

    return this.authHttp.put(url, holding)
      .flatMap((res: Response) => {
        return this.authHttp.get(url);
      })
      .map((res: Response) => res.json())
      .catch(this.utils.handleError);
  }

  public delete(id: String): Observable<void> {
    const url = `${this.holdingsUrl}/${id}`;
    return this.authHttp
      .delete(url)
      .map(() => null)
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.error('handleError()');

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
