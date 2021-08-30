import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Navigation {

  constructor(private router: Router) {
  }

  public setQueryParams = (queryParams: any) => {
    this.router.navigate([], {
      queryParams,
      queryParamsHandling: 'merge'
    });
  }

}
