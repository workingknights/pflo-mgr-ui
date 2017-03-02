import { Component, OnInit, ApplicationRef } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PortfolioEntry } from '.././portfolioEntry';
import { PortfolioService } from '.././portfolio.service';
import { HoldingService } from '.././holding.service';
import { Auth } from '../auth.service';
import { Holding } from '../holding';
import { Ticker } from '../ticker';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  private portfolioEntries: PortfolioEntry[] = [];
  private summary: PortfolioEntry;

	private newHolding: Holding = new Holding('', new Ticker('', '', '', '', ''), 1, 1.0, 0.0,
		Date.now(), 0.0, 0.0);
  private showAddHoldingForm = false;
  private errorMessage: string;

  constructor(
    private portfolioService: PortfolioService,
    private holdingService: HoldingService,
    private appRef: ApplicationRef,
    private auth: Auth) {
  }

  public ngOnInit() {
    console.log('PortfolioComponent:ngOnInit() authenticated = ' + this.auth.authenticated());
    if (this.auth.authenticated()) {
      this.loadPortfolio();
    }
  }

  saveHolding(holding: any) {
		console.log('Portfolio:saveHolding() - holding = ', holding);
    this.holdingService.create(holding)
      .subscribe(holding => {
        console.log('reload portfolio...');
        this.loadPortfolio();
      },
      error => {
        console.log(error);
      });

			this.newHolding = new Holding('', new Ticker('', '', '', '', ''), 1, 1.0, 0.0,
				Date.now(), 0.0, 0.0);
			this.showAddHoldingForm = false;
  }

  loadPortfolio() {
  	this.portfolioService.getPortfolio()
      .subscribe(portfolio => {
        this.portfolioEntries = portfolio.entries;
        this.summary = portfolio.summary;
      },
      error => {
        this.errorMessage = <any>error;
        console.log(error);
      });
  }


}
