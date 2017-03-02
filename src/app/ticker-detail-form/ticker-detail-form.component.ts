import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

import { Constants } from '../utils';

import { Ticker } from '.././ticker';

@Component({
  selector: 'ticker-detail-form',
  templateUrl: './ticker-detail-form.component.html',
  styleUrls: ['./ticker-detail-form.component.css']
})
export class TickerDetailFormComponent {

		@Output() submitted:EventEmitter<Ticker> = new EventEmitter();
		@Output() closed:EventEmitter<string> = new EventEmitter();

		private _ticker: Ticker = new Ticker('','','USD','LSE','');
		private currencies = Constants.currencies;
		private exchanges = Constants.exchanges;

	  private submittedForm = false;

		@Input()
		set ticker(ticker: Ticker) {
			console.log('set() - ticker', ticker);
			this._ticker = ticker;
		}

		get ticker(): Ticker { return this._ticker; }

		onSubmit() {
			console.log('onSubmit() - ticker', this._ticker);
	    this.submittedForm = true;

	    let symbol = this._ticker.symbol.trim();
	    let currency = this._ticker.currency.trim();
	    let exchange = this._ticker.exchange.trim();
	    if (!symbol || !currency || !exchange) { return; }

			this.submitted.emit(this._ticker);

			this._ticker = new Ticker('', '', 'USD', 'NYSEARCA', '');
	  }

		protected closeForm() {
			this.closed.emit('complete');
		}

}
