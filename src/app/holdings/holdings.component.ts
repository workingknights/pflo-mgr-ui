import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Holding } from '.././holding';
import { HoldingService } from '.././holding.service';
import { Auth } from '../auth.service';

@Component({
  selector: 'app-holdings',
  templateUrl: './holdings.component.html',
  styleUrls: ['./holdings.component.css'],
  providers: [HoldingService]
})
export class HoldingsComponent implements OnInit {

  public holdings: Holding[] = [];
  private errorMessage: string;

  private showHoldingDetailForm: boolean = false;
  private editing: boolean = false;
  private submittedForm = false;
  private selected: Holding[] = [];
  private selectedHolding: Holding;

  constructor(
    private holdingService: HoldingService,
    private auth: Auth) { }

  public ngOnInit() {
    if (this.auth.authenticated()) {
      this.loadHoldings();
    }
  }

  loadHoldings() {
    this.holdingService.getHoldings()
      .subscribe(holdings => {
        let sortedHoldings = holdings.sort(this.tradeDateSort);
        this.holdings = sortedHoldings;
      },
      error => this.errorMessage = <any>error);
  }

	editHolding() {
		this.selectedHolding = this.selected[0];
		this.showHoldingDetailForm = true;
		this.editing = true;
	}

	onSelect({ selected } : any) {
    console.log('Select Event', this.selected);
  }

  saveHolding(holding: Holding) {
    if (this.editing) {
      this.holdingService.updateHolding(holding)
        .subscribe(
        holding => this.holdings.push(holding),
        error => this.errorMessage = <any>error
        );
				this.showHoldingDetailForm = false;
    }
    else {
      this.holdingService.create(holding)
        .subscribe(
        holding => this.holdings.push(holding),
        error => this.errorMessage = <any>error
        );
    }
  }

  delete(holding: Holding): void {
    this.holdingService
      .delete(holding.id)
      .subscribe(() => {
        this.holdings = this.holdings.filter(h => h != holding);
      },
      error => this.errorMessage = <any>error);
  }

  private tradeDateSort(h1: Holding, h2: Holding) {
    if (h1.tradeDate > h2.tradeDate) {
      return -1;
    }

    if (h1.tradeDate < h2.tradeDate) {
      return 1;
    }

    return 0;
  }
}
