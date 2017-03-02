"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var portfolio_component_1 = require("./portfolio/portfolio.component");
var holdings_component_1 = require("./holdings/holdings.component");
var model_component_1 = require("./model/model.component");
var sandbox_component_1 = require("./sandbox/sandbox.component");
var tickers_component_1 = require("./tickers/tickers.component");
var portfolio_entry_detail_component_1 = require("./portfolio-entry-detail/portfolio-entry-detail.component");
var routes = [
    { path: 'portfolio', component: portfolio_component_1.PortfolioComponent },
    { path: 'holdings', component: holdings_component_1.HoldingsComponent },
    { path: 'model', component: model_component_1.ModelComponent },
    { path: 'tickers', component: tickers_component_1.TickersComponent },
    { path: 'sandbox', component: sandbox_component_1.SandboxComponent },
    { path: 'portfolioEntry/:ticker', component: portfolio_entry_detail_component_1.PortfolioEntryDetailComponent },
    { path: '', component: dashboard_component_1.DashboardComponent },
    { path: '**', component: dashboard_component_1.DashboardComponent }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule],
    }),
    __metadata("design:paramtypes", [])
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
