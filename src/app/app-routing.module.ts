import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { ErrorComponent } from './error/error.component';
import { LibraryComponent } from './library/library.component';
import { AlreadyReadComponent } from './already-read/already-read.component';
import { ToReadComponent } from './to-read/to-read.component';
import { ReadingComponent } from './reading/reading.component';
import { SearchComponent } from './search/search.component';
import { ReadComponent } from './read/read.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'error', component: ErrorComponent },
  { path: 'library', component: LibraryComponent, canActivate: [AuthGuard] },
  { path: 'alreadyRead', component: AlreadyReadComponent, canActivate: [AuthGuard] },
  { path: 'toRead', component: ToReadComponent, canActivate: [AuthGuard] },
  { path: 'reading', component: ReadingComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent },
  { path: 'read/:entry', component: ReadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
