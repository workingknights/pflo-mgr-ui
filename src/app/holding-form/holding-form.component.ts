import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Holding } from '.././holding';
import { Ticker } from '.././ticker';

@Component({
  selector: 'holding-detail-form',
  templateUrl: './holding-form.component.html',
  styleUrls: ['./holding-form.component.css']
})
export class HoldingFormComponent {

	@Input() editing: boolean;
	@Output() submitted:EventEmitter<Holding> = new EventEmitter();
	@Output() closed:EventEmitter<string> = new EventEmitter();

  private _holding = new Holding('', new Ticker('', '', '', '', ''), 1, 1.0, 0.0,
		Date.now(), 0.0, 0.0);
  // private submittedForm = false;

	@Input()
	set holding(holding: Holding) {
		this._holding = holding;
	}

	get holding(): Holding { return this._holding; }

  protected onSubmit() {
    // this.submittedForm = true;

    let symbol = this.holding.ticker.symbol.trim();
    if (!symbol) { return; }

		this.submitted.emit(this.holding);

		this.newHolding();
  }

  protected newHolding() {
    this.holding = new Holding('', new Ticker('', '', '', '', ''), 1, 1.0, 0.0,
			Date.now(), 0.0, 0.0);
  }

	protected closeForm() {
		this.closed.emit('complete');
	}

	parseDate(dateString: string): Date {
	    if (dateString) {
	        return new Date(dateString);
	    } else {
	        return null;
	    }
	}

  get tradeDate(): any {
    return this.tradeDate.toISOString().substring(0, 10);
  }
}
