import { Ticker} from './ticker';

export class Holding {
  constructor(
    public id: string,
    public ticker: Ticker,
    public shares: number,
    public tradePrice: number,
		public commission: number,
    public tradeDate: any,
		public initialMarketValue: number,
		public initialMarketValueBase: number
  ) { }
}
