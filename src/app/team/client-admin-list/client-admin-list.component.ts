import { Component, OnInit } from '@angular/core';
/* rxjs */
import { Observable, of } from 'rxjs';
/* Models */
import { User } from 'src/app/models';
/* NgRx */
import { Store, select } from '@ngrx/store';
/* State */
import { State } from '../../state/state';
/* Selectors */
import { getUsers } from 'src/app/state/users/users.selector';
import { getLoader } from 'src/app/state/loader/loader.selector';
/* Actions */
import { LoadClientAdmin } from 'src/app/state/users';
import { StartLoader } from 'src/app/state/loader/loader.actions';

@Component({
  selector: 'app-client-admin-list',
  templateUrl: './client-admin-list.component.html',
  styleUrls: ['./client-admin-list.component.css'],
})
export class ClientAdminListComponent implements OnInit {
  /* Observable of users from store */
  users$: Observable<User[]> = of([] as User[]);
  /* Observable of loader from store */
  loader$: Observable<boolean> = of(false);
  constructor(private store: Store<State>) {
    this.store.dispatch(new StartLoader());
    // Dispatch action to load team members
    this.store.dispatch(new LoadClientAdmin());
    // Use selector to ger loader state
    this.loader$ = this.store.pipe(select(getLoader));
  }

  ngOnInit(): void {
    this.users$ = this.store.pipe(select(getUsers));
  }
}
