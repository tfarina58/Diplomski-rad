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
import { NewsComponent } from './pages/news/news.component';
import {LegalInfoComponent} from "./pages/settings/legal-info/legal-info.component";
import {ForgotPasswordComponent} from "./pages/auth/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./pages/auth/reset-password/reset-password.component";

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
        NewsComponent,
        LegalInfoComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule
    ],
    exports: [
        HeaderComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
