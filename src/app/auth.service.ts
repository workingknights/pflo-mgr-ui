import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

import { authConfig } from './auth.config';
// import { environment } from '../environments/environment';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {

  private lock: any;

  // Store profile object in auth class
  private userProfile: Object;

  constructor(private router: Router) {
    if (process.env.ENV === 'production') {
      // Configure Auth0
      this.lock = new Auth0Lock(authConfig.clientID, authConfig.domain, {});

      // Set userProfile attribute of already saved profile
      this.userProfile = JSON.parse(localStorage.getItem('profile'));

      // Add callback for lock `authenticated` event
      this.lock.on('authenticated', (authResult: any) => {
        localStorage.setItem('id_token', authResult.idToken);

        // Fetch profile information
        this.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
          if (error) {
            console.log(error);
          }

          localStorage.setItem('profile', JSON.stringify(profile));
          this.router.navigateByUrl('/portfolio', { skipLocationChange: true });
          this.userProfile = profile;
        });
        this.lock.hide();
      });
    }
  }

  public login() {
    // Call the show method to display the widget.
		if (process.env.ENV === 'production') {
      this.lock.show();
    }
    else {
      localStorage.setItem('id_token', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnb29nbGUtb2F1dGgyfDExODMwMDQwODMwMTA3NzYxNTI5MSIsImF1ZCI6IlQySFFVeFNVWFh1dGQxcmlnV3BVdmRFT05rZDVzMWdtIiwiaXNzIjoiaHR0cHM6Ly93b3JraW5na25pZ2h0cy5hdXRoMC5jb20vIiwiZXhwIjoxNTc3ODA0NDAwLCJpYXQiOjE0ODMxOTY0MDB9.WutOBkyCKlPFq3AOKAQaTSJkil97jKOzgNbViTdqrTs');
    }
    console.log('login() called.  authenticated = ' + tokenNotExpired());
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.userProfile = undefined;

    // Send the user back to the home page after logout
    this.router.navigateByUrl('/');
  }
}
