import { BrowserModule } from '@angular/platform-browser';
import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import {UserService} from './_services/user.service';
import {Routes, RouterModule} from '@angular/router'
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { AuthGuardService as AuthGuard } from './_helpers/auth.guard';
import { FrontEndConfig } from './frontendConfig';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input' ;
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';

import { LoginComponent } from './login/login.component';
import {FilterPipe} from './filter.pipe';
import { GetproductsComponent } from './getproducts/getproducts.component';
import { CommondialogComponent } from './commondialog/commondialog.component'

const routes : Routes = [
  {path:'',component :LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'getproducts',component:GetproductsComponent,canActivate:[AuthGuard]}

]


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    FilterPipe,
    GetproductsComponent,
    CommondialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
    NgxSpinnerModule,
    MatButtonModule,
    MatTooltipModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right'
    }),
  ],
  exports:[
    RouterModule
  ],
  providers: [
    UserService, FrontEndConfig, AuthGuard, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  entryComponents:[CommondialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
