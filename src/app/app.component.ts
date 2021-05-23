import {
  Component,
  AfterContentChecked,
  ChangeDetectorRef,
} from '@angular/core';
/* rxjs */
import { Observable, of } from 'rxjs';

/* State */
import { State } from './state/state';
/* Selectors */
import { getAuth } from './state/auth/auth.selector';
/* Actions */
import { LogOut } from './state/auth/auth.actions';
import { StartLoader } from './state/loader/loader.actions';
/* NgRx */
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterContentChecked {
  /* Observable of auth from store */
  auth$: Observable<boolean> = of(false);

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private store: Store<State>
  ) {}

  ngAfterContentChecked(): void {
    // Use selector to ger loader state
    this.auth$ = this.store.pipe(select(getAuth));
    this._changeDetectorRef.detectChanges();
  }

  onLogOut(): void {
    this.store.dispatch(new LogOut());
  }
}
