import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';

import { Angular2DataTableModule } from 'angular2-data-table';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { HoldingFormComponent } from './holding-form/holding-form.component';
import { PortfolioEntryDetailComponent } from './portfolio-entry-detail/portfolio-entry-detail.component';
import { HoldingsComponent } from './holdings/holdings.component';
import { ModelComponent } from './model/model.component';
import { ModelEntryFormComponent } from './model-entry-form/model-entry-form.component';
import { SandboxComponent } from './sandbox/sandbox.component';
import { TickersComponent } from './tickers/tickers.component';
import { TickerDetailFormComponent } from './ticker-detail-form/ticker-detail-form.component';

import { HoldingService } from './holding.service';
import { PortfolioService } from './portfolio.service';
import { ModelService } from './model.service';
import { SandboxService } from './sandbox.service';
import { TickerService } from './ticker.service';

import { Utils } from './utils';

import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Auth } from './auth.service';
import { AuthGuard } from './auth.guard';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    globalHeaders: [{ 'Content-Type': 'application/json' }],
  }), http, options);
}

@NgModule({
  imports: [
    BrowserModule,
		HttpModule,
		FormsModule,
		AppRoutingModule,
		Angular2DataTableModule
	],
  declarations: [
    AppComponent,
		DashboardComponent,
		PortfolioComponent,
		HoldingFormComponent,
		PortfolioEntryDetailComponent,
		HoldingsComponent,
		ModelComponent,
    ModelEntryFormComponent,
    SandboxComponent,
    TickersComponent,
    TickerDetailFormComponent
  ],
	providers: [
		HoldingService,
    PortfolioService,
		ModelService,
		SandboxService,
		TickerService,
		Utils,
		Auth,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
		AuthGuard
	],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
