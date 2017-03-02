import { Recommendation } from './recommendation';

export class PortfolioEntry {
    constructor(
        public ticker: string,
        public name: string,
				public totalShares: number,
        public currPrice: number,
        public avgUnitCost: number,
        public totalCost: number,
        public marketValue: number,
        public marketValueBase: number,
        public currency: string,
        public ask: number,
        public ma50Day: number,
        public ma200Day: number,
				public totalPercentGain: number,
				public totalGain: number,
				public totalGainBase: number,
				public yearLow: number,
				public yearHigh: number,
				public percentChange: number,
				public dailyGainBase: number,
				public recommendation: Recommendation,
				public rebalToModel: number,
				public rebalShares: number
    ) {}
}
