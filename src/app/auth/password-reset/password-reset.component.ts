import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services';
@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css'],
})
export class PasswordResetComponent implements OnInit {
  password = '';
  passwordConfirm = '';
  email = '';
  activationCode = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _auth: AuthService
  ) {
    this.route.queryParams.subscribe((p) => {
      (this.activationCode = p.codigo), (this.email = p.email);
    });
  }

  ngOnInit(): void {}

  isDisabled(): boolean {
    if (!this.password && !this.passwordConfirm) {
      return true;
    }
    return this.password !== this.passwordConfirm;
  }

  resetPassword(): void {
    this._auth
      .changePassword({
        password: this.password,
        email: this.email,
        activationCode: this.activationCode,
      })
      .subscribe(
        (res: any) => {
          this.password = '';
          this.passwordConfirm = '';
          Swal.fire({
            title: '¡Clave actualizada!',
            showCancelButton: false,
            showDenyButton: false,
            confirmButtonText: `Aceptar`,
            confirmButtonColor: '#50b848',
            icon: 'success',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/auth']);
            }
          });
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }
}
