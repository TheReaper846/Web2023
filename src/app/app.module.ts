import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MenuLibraryComponent } from './menu-library/menu-library.component';
import { IndexComponent } from './index/index.component';
import { LibraryComponent } from './library/library.component';
import { NewUserComponent } from './new-user/new-user.component';
import { ReadComponent } from './read/read.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    FooterComponent,
    HeaderComponent,
    MenuLibraryComponent,
    IndexComponent,
    LibraryComponent,
    NewUserComponent,
    ReadComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
