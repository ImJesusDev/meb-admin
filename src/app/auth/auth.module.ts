import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Routing */
import { AuthRoutingModule } from './auth-routing.module';
import { ActivationComponent } from './activation/activation.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';

@NgModule({
  declarations: [LoginComponent, ActivationComponent, PasswordResetComponent],
  imports: [FormsModule, ReactiveFormsModule, AuthRoutingModule, CommonModule],
})
export class AuthModule {}
