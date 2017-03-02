import { Component } from '@angular/core';

import { HoldingService } from './holding.service';
import { PortfolioService } from './portfolio.service';
import { Auth } from './auth.service';

import '../../public/css/styles.css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Portfolio Manager';

	constructor(private auth: Auth) {}
}
