import { Component, OnInit } from '@angular/core';

import { PortfolioService } from '../portfolio.service';
import { SandboxService } from '../sandbox.service';
import { Auth } from '../auth.service';
import { PortfolioEntry } from '../portfolioEntry';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css']
})
export class SandboxComponent implements OnInit {

  protected scaledMV: number;
  protected portfolioEntries: PortfolioEntry[] = [];

  constructor(
    private portfolioService: PortfolioService,
    private sandboxService: SandboxService,
    private auth: Auth) {
  }

  public ngOnInit() {
    if (this.auth.authenticated()) {
      this.loadPortfolio();
    }
  }

  loadPortfolio() {
    this.portfolioService.getPortfolio()
      .subscribe(portfolio => {
        this.portfolioEntries = portfolio.entries;
      },
      error => {
        console.log(error);
      });
  }

  updateScaledMV(scaledMV: string) {
    this.sandboxService.getSandboxPortfolio(+scaledMV)
      .subscribe(portfolioEntries => {
        this.portfolioEntries = portfolioEntries;
      },
      error => {
        console.log(error);
      });
  }
}
