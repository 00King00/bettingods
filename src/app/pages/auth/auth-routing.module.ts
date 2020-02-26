import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupPage } from './signup/signup.page';
import { LoginPage } from './login/login.page';
import { ForgotPasswordPage } from './forgot-password/forgot-password.page';
import { ChangePasswordPage } from './change-password/change-password.page';

const routes: Routes = [
  { path: '',
    children: [
      { path: 'signup', component: SignupPage },
      { path: 'login', component: LoginPage },
      { path: 'forgot-password', component: ForgotPasswordPage },
      { path: 'change-password', component: ChangePasswordPage },
      { path: '', redirectTo: '/auth/login', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {}
