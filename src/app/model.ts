export class ModelEntry {
	constructor(
		public ticker: string,
    public portfolioWeight: number
	) {}
};

export class Model {
  constructor(
    public id: string,
		public userId: string,
    public entries: ModelEntry[]
  ) { }
};
