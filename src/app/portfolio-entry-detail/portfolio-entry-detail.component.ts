import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { PortfolioEntry } from '.././portfolioEntry';
import { PortfolioService } from '.././portfolio.service';

@Component({
  selector: 'app-portfolio-entry-detail',
  templateUrl: './portfolio-entry-detail.component.html',
  styleUrls: ['./portfolio-entry-detail.component.css']
})
export class PortfolioEntryDetailComponent implements OnInit {

	public portfolioEntry: PortfolioEntry;
	
  constructor(
		private portfolioService: PortfolioService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
	  this.route.params
	    .switchMap((params: Params) => this.portfolioService.getPortfolioEntry(params['ticker']))
	    .subscribe(portfolioEntry => this.portfolioEntry = portfolioEntry);
	}

	goBack(): void {
	  this.location.back();
	}
}
