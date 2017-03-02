// logged-in.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Auth } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) { }

  canActivate() {
    if (!this.auth.authenticated()) {
			console.log('not authenticated so redirecting to root');
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
