import { PortfolioEntry } from './portfolioEntry';

export class Portfolio {
    constructor(
        public entries: PortfolioEntry[],
				public summary: PortfolioEntry
    ) {}
}
