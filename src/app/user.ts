import { ModelEntry } from './model';

export class User {
	constructor(
		public userId: string,
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
