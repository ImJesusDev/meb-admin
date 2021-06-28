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
import { LoadTeam } from 'src/app/state/users';
import { StartLoader } from 'src/app/state/loader/loader.actions';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css'],
})
export class TeamListComponent implements OnInit {
  /* Observable of users from store */
  users$: Observable<User[]> = of([] as User[]);
  /* Observable of loader from store */
  loader$: Observable<boolean> = of(false);

  constructor(private store: Store<State>) {
    this.store.dispatch(new StartLoader());
    // Dispatch action to load team members
    this.store.dispatch(new LoadTeam());
    // Use selector to ger loader state
    this.loader$ = this.store.pipe(select(getLoader));
  }

  ngOnInit(): void {
    this.users$ = this.store.pipe(select(getUsers));
  }
}
