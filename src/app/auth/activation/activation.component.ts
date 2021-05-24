import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/* Services */
import { AuthService } from '../../services';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css'],
})
export class ActivationComponent implements OnInit {
  activationCode = '';
  email = '';
  constructor(private _auth: AuthService, private _route: ActivatedRoute) {
    this._route.queryParams.subscribe((p) => {
      this.activationCode = p.codigo;
      this.email = p.email;
    });
  }

  ngOnInit(): void {
    if (this.email && this.activationCode) {
      this._auth
        .activate({ email: this.email, activationCode: this.activationCode })
        .subscribe(
          (res) => {
            console.log(res);
          },
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        );
    }
  }
}
