import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FaqComponent } from './faq/faq.component';
import { HighscoreComponent } from './highscore/highscore.component';
import { ProfileComponent } from './profile/profile.component';
import { PuzzleComponent } from './puzzle/puzzle.component';
import { PuzzleoneComponent } from './puzzleone/puzzleone.component';
import { PuzzletwoComponent } from './puzzletwo/puzzletwo.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'puzzle', component: PuzzleComponent },
  { path: 'puzzleone', component: PuzzleoneComponent },
  { path: 'puzzletwo', component: PuzzletwoComponent },
  { path: 'highscore', component: HighscoreComponent },
  { path: 'logout', component: LogoutComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }