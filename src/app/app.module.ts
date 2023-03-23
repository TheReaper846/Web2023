import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './Modules/login/login.component';
import { ErrorComponent } from './Modules/error/error.component';
import { FooterComponent } from './Modules/footer/footer.component';
import { HeaderComponent } from './Modules/header/header.component';
import { IndexComponent } from './Modules/index/index.component';
import { ProfileComponent } from './Modules/profile/profile.component';
import { ReadComponent } from './Modules/read/read.component';
import { SearchComponent } from './Modules/search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './Modules/signup/signup.component';
import { ProfileHeaderComponent } from './Modules/profile-header/profile-header.component';
import { LibraryComponent } from './Modules/library/library.component';
import { AlreadyReadComponent } from './Modules/already-read/already-read.component';
import { ToReadComponent } from './Modules/to-read/to-read.component';
import { ReadingComponent } from './Modules/reading/reading.component';
import { LogoutComponent } from './Modules/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    FooterComponent,
    HeaderComponent,
    IndexComponent,
    ProfileComponent,
    ReadComponent,
    SearchComponent,
    SignupComponent,
    ProfileHeaderComponent,
    LibraryComponent,
    AlreadyReadComponent,
    ToReadComponent,
    ReadingComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
