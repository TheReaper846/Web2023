import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { IndexComponent } from './index/index.component';
import { ProfileComponent } from './profile/profile.component';
import { ReadComponent } from './read/read.component';
import { SearchComponent } from './search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './signup/signup.component';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { LibraryComponent } from './library/library.component';
import { AlreadyReadComponent } from './already-read/already-read.component';
import { ToReadComponent } from './to-read/to-read.component';
import { ReadingComponent } from './reading/reading.component';
import { LogoutComponent } from './logout/logout.component';

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
