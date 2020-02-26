import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { SignupPage } from './signup/signup.page';
import { LoginPage } from './login/login.page';
import { ForgotPasswordPage } from './forgot-password/forgot-password.page';
import { ChangePasswordPage } from './change-password/change-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthPageRoutingModule,
    
  ],
  declarations: [ SignupPage, LoginPage, ForgotPasswordPage, ChangePasswordPage],
})
export class AuthPageModule {}
