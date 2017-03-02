import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { AuthHttp } from 'angular2-jwt';

import { Auth } from './auth.service';
import { Ticker } from './ticker';
import { Utils } from './utils';

@Injectable()
export class TickerService {

  constructor(
    private auth: Auth,
    private authHttp: AuthHttp,
		private utils: Utils
	) { }

  private tickerUrl = 'api/ticker';

  public getTickers(): Observable<Ticker[]> {
    return this.authHttp.get(this.tickerUrl)
      .map(res => res.json().data as Ticker[])
      .catch(this.utils.handleError);
  }

  public saveTicker(ticker: Ticker): Observable<Ticker> {
    console.log('saveTicker() json=' + JSON.stringify(ticker));

    return this.authHttp.post(this.tickerUrl, ticker)
      .flatMap((res: Response) => {
        let location = res.headers.get('Location');
        return this.authHttp.get(location);
      })
      .map((res: Response) => res.json())
      .catch(this.utils.handleError);
  }

	public updateTicker(ticker: Ticker): Observable<Ticker> {
		const url = `${this.tickerUrl}/${ticker.id}`;
		console.log('updateTicker() json=', JSON.stringify(ticker), url);

    return this.authHttp.put(url, ticker)
      .flatMap((res: Response) => {
        return this.authHttp.get(url);
      })
      .map((res: Response) => res.json())
      .catch(this.utils.handleError);
  }

}
