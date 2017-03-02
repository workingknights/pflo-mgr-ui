import { Component, OnInit } from '@angular/core';

import { Ticker } from '.././ticker';
import { TickerService } from '.././ticker.service';
import { Auth } from '../auth.service';

@Component({
  selector: 'tickers',
  templateUrl: './tickers.component.html',
  styleUrls: ['./tickers.component.css'],
  providers: [TickerService]
})
export class TickersComponent implements OnInit {

  private currTicker: Ticker = new Ticker('', '', 'USD', 'NYSEARCA', '');
  private tickers: Ticker[] = [];
  private errorMessage: string;
  private showTickerDetailForm: boolean = false;
  private editing: boolean = false;
  private submittedForm = false;
  private selected: Ticker[] = [];

  constructor(
    private tickerService: TickerService,
    private auth: Auth
  ) { }

  ngOnInit() {
    if (this.auth.authenticated()) {
      this.loadTickers();
    }
  }

  loadTickers() {
    this.tickerService.getTickers()
      .subscribe(
      tickers => this.tickers = tickers,
      error => this.errorMessage = <any>error
      );
  }

  saveTicker(ticker: Ticker) {
    console.log('saveTicker: ', ticker);
    if (this.editing) {
      this.tickerService.updateTicker(ticker)
        .subscribe(
        error => this.errorMessage = <any>error
        );
    }
    else {
      this.tickerService.saveTicker(ticker)
        .subscribe(
        ticker => this.tickers.push(ticker),
        error => this.errorMessage = <any>error
        );
    }
  }

  onSelect({ selected } : any) {
    console.log('Select Event', this.selected);
  }

  editTicker() {
    this.currTicker = this.selected[0];
    this.showTickerDetailForm = true;
    this.editing = true;
    console.log('editing ticker', this.currTicker);
  }
}
