/* Core Libraries */
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../state/state';
import { SetAuth } from '../state/auth/auth.actions';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<State>) {}

  canActivate(): boolean {
    // Get all cookies
    const cookies = document.cookie;
    // Split by = to get values and names
    const split = cookies.split('=');
    // Validate if the cookie exists
    const cookieExists = split.includes('express:sess');
    if (!cookieExists) {
      this.router.navigate(['/login']);
      return false;
    }
    this.store.dispatch(new SetAuth());
    return true;
  }
}
