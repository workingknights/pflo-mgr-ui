export class Ticker {
  constructor(
    public id: string,
    public symbol: string,
    public currency: string,
		public exchange: string,
		public fullName: string
  ) { }
}
