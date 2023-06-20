import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CommonModule} from "@angular/common";
import {AuthComponent} from "./pages/auth/auth.component";
import {LoginComponent} from "./pages/auth/login/login.component";
import {RegisterComponent} from "./pages/auth/register/register.component";
import {HomeComponent} from "./pages/home/home.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HeaderComponent} from "./components/header/header.component";
import {SettingsComponent} from "./pages/settings/settings.component";
import {PersonalInfoComponent} from "./pages/settings/personal-info/personal-info.component";
import {LegalInfoComponent} from "./pages/settings/legal-info/legal-info.component";
import {ForgotPasswordComponent} from "./pages/auth/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./pages/auth/reset-password/reset-password.component";
import {MdbModalModule} from "mdb-angular-ui-kit/modal";
import { FullscreenImageComponent } from './components/fullscreen-image/fullscreen-image.component';
import {HttpClientModule} from "@angular/common/http";
import {MyEstatesComponent} from "./pages/my-estates/my-estates.component";
import {SubAdminsComponent} from "./pages/sub-admins/sub-admins.component";

@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        HeaderComponent,
        SettingsComponent,
        PersonalInfoComponent,
        LegalInfoComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        FullscreenImageComponent,
        MyEstatesComponent,
        SubAdminsComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
        MdbModalModule,
        HttpClientModule
    ],
    exports: [
        HeaderComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
