import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
/* rxjs */
import { Observable, of, Subscription } from 'rxjs';
/* Models */
import { User, ApiError } from 'src/app/models';
/* NgRx */
import { Store, select } from '@ngrx/store';
/* Selectors */
import {
  getUserByEmail,
  getUserErrors,
} from 'src/app/state/users/users.selector';
import { getLoader } from 'src/app/state/loader/loader.selector';
/* State */
import { State } from '../../state/state';
import { StartLoader } from 'src/app/state/loader/loader.actions';
/* Actions */
import { AddAdminStart } from 'src/app/state/users';
/* Sweet Alerts */
import Swal from 'sweetalert2';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.css'],
})
export class TeamFormComponent implements OnInit, OnDestroy {
  /* Keep track of subscriptions */
  private subscriptions = new Subscription();
  /* Observable of errors from store */
  errors$: Observable<ApiError[]> = of([] as ApiError[]);
  /* Form Group */
  userForm: FormGroup;
  /* New User Object */
  user: User;
  /* base64 photo */
  base64Photo = '';
  /* Observable of loader from store */
  loader$: Observable<boolean> = of(false);

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private store: Store<State>
  ) {
    this.user = {
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      password: '',
      phone: '',
      documentType: '',
      documentNumber: '',
      id: '',
    };
    this.userForm = this._formBuilder.group({
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      documentType: [this.user.documentType, [Validators.required]],
      documentNumber: [this.user.documentNumber, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      phone: [this.user.phone, [Validators.required]],
      role: [this.user.role, [Validators.required]],
      password: [this.user.password, [Validators.required]],
      photo: [this.user.photo, [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    // Use selector to get user errors from state
    this.errors$ = this.store.pipe(select(getUserErrors));
    // Use selector to get loader state
    this.loader$ = this.store.pipe(select(getLoader));
  }

  /* Handle file change */
  fileChanged(event: any): void {
    // Instance of reader
    const reader = new FileReader();
    // Check if any file is selected
    if (event.target && event.target.files.length) {
      // Get file name
      const filename = event.target.files[0].name;
      // Initialize the base64 string with data type
      this.base64Photo = `data:${event.target.files[0].type};base64,`;
      // Bind function to execute on file load
      reader.onload = this._handleReaderLoaded.bind(this);
      // Read selected file
      reader.readAsBinaryString(event.target.files[0]);
      // Set as value of the form the name of the file
      this.userForm.patchValue({
        photo: filename,
      });
    }
  }

  submitForm(): void {
    // Dispatch action to start loader
    this.store.dispatch(new StartLoader());

    this.store.dispatch(
      new AddAdminStart({
        id: '',
        photo: this.base64Photo,
        firstName: this.userForm.controls['firstName'].value,
        lastName: this.userForm.controls['lastName'].value,
        email: this.userForm.controls['email'].value,
        password: this.userForm.controls['password'].value,
        documentType: this.userForm.controls['documentType'].value,
        documentNumber: this.userForm.controls['documentNumber'].value,
        phone: this.userForm.controls['phone'].value,
        role: this.userForm.controls['role'].value,
      })
    );
    this.subscriptions.add(
      this.store
        .pipe(select(getUserByEmail(this.userForm.controls['email'].value)))
        .subscribe((user) => {
          if (user) {
            Swal.fire({
              title: '¡Usuario creado!',
              showCancelButton: false,
              showDenyButton: false,
              confirmButtonText: `Aceptar`,
              confirmButtonColor: '#50b848',
              icon: 'success',
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/equipo']);
              }
            });
          }
        })
    );
  }

  /**
   * Function to convert image file to
   * base 64 string
   */
  _handleReaderLoaded(readerEvt: any) {
    // Get binary string from FileReader
    var binaryString = readerEvt.target.result;
    // Convert binary to base64
    const base64String = btoa(binaryString);
    // Set the final base64 string
    this.base64Photo = `${this.base64Photo}${base64String}`;
  }
}
