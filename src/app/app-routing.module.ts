import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './Modules/index/index.component';
import { LoginComponent } from './Modules/login/login.component';
import { SignupComponent } from './Modules/signup/signup.component';
import { ErrorComponent } from './Modules/error/error.component';
import { LibraryComponent } from './Modules/library/library.component';
import { AlreadyReadComponent } from './Modules/already-read/already-read.component';
import { ToReadComponent } from './Modules/to-read/to-read.component';
import { ReadingComponent } from './Modules/reading/reading.component';
import { SearchComponent } from './Modules/search/search.component';
import { ReadComponent } from './Modules/read/read.component';
import { LogoutComponent } from './Modules//logout/logout.component';
import { AuthGuard } from './Auth/auth.guard';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'library', component: LibraryComponent, canActivate: [AuthGuard]},
  { path: 'alreadyRead', component: AlreadyReadComponent, canActivate: [AuthGuard] },
  { path: 'toRead', component: ToReadComponent, canActivate: [AuthGuard] },
  { path: 'reading', component: ReadingComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent },
  { path: 'read/:entry', component: ReadComponent },
  { path: 'logout', component: LogoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
