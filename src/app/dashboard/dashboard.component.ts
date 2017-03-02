import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Auth } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  template: ``
})
export class DashboardComponent implements OnInit {

  constructor(
    private auth: Auth,
		private router: Router) {
  }

	public ngOnInit() {
    if (!this.auth.authenticated()) {
      this.auth.login();
    }
  }
}
