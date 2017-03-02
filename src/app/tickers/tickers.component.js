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
var ticker_1 = require(".././ticker");
var ticker_service_1 = require(".././ticker.service");
var auth_service_1 = require("../auth.service");
var TickersComponent = (function () {
    function TickersComponent(tickerService, auth) {
        this.tickerService = tickerService;
        this.auth = auth;
        this.currTicker = new ticker_1.Ticker('', '', 'USD', 'NYSEARCA', '');
        this.tickers = [];
        this.showTickerDetailForm = false;
        this.editing = false;
        this.submittedForm = false;
        this.selected = [];
    }
    TickersComponent.prototype.ngOnInit = function () {
        if (this.auth.authenticated()) {
            this.loadTickers();
        }
    };
    TickersComponent.prototype.loadTickers = function () {
        var _this = this;
        this.tickerService.getTickers()
            .subscribe(function (tickers) { return _this.tickers = tickers; }, function (error) { return _this.errorMessage = error; });
    };
    TickersComponent.prototype.saveTicker = function (ticker) {
        var _this = this;
        console.log('saveTicker: ', ticker);
        if (this.editing) {
            this.tickerService.updateTicker(ticker)
                .subscribe(function (error) { return _this.errorMessage = error; });
        }
        else {
            this.tickerService.saveTicker(ticker)
                .subscribe(function (ticker) { return _this.tickers.push(ticker); }, function (error) { return _this.errorMessage = error; });
        }
    };
    TickersComponent.prototype.onSelect = function (_a) {
        var selected = _a.selected;
        console.log('Select Event', this.selected);
    };
    TickersComponent.prototype.editTicker = function () {
        this.currTicker = this.selected[0];
        this.showTickerDetailForm = true;
        this.editing = true;
        console.log('editing ticker', this.currTicker);
    };
    return TickersComponent;
}());
TickersComponent = __decorate([
    core_1.Component({
        selector: 'tickers',
        templateUrl: './tickers.component.html',
        styleUrls: ['./tickers.component.css'],
        providers: [ticker_service_1.TickerService]
    }),
    __metadata("design:paramtypes", [ticker_service_1.TickerService,
        auth_service_1.Auth])
], TickersComponent);
exports.TickersComponent = TickersComponent;
