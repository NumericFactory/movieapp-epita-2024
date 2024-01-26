import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListViewComponent } from './views/movies/movie-list-view/movie-list-view.component';
import { TvListViewComponent } from './views/tv/tv-list-view/tv-list-view.component';
import { MovieDetailViewComponent } from './views/movies/movie-detail-view/movie-detail-view.component';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { SearchViewComponent } from './views/search-view/search-view.component';
import { RegisterViewComponent } from './views/user/register-view/register-view.component';
import { LoginViewComponent } from './views/user/login-view/login-view.component';
import { TvDetailViewComponent } from './views/tv/tv-detail-view/tv-detail-view.component';

// ajouter les routes
const routes: Routes = [
  { path: '', component: HomeViewComponent },
  { path: 'search', component: SearchViewComponent },
  // movies views
  { path: 'movies', component: MovieListViewComponent },
  { path: 'movies/:id', component: MovieDetailViewComponent },
  // tv views
  { path: 'tv', component: TvListViewComponent },
  { path: 'tv/:id', component: TvDetailViewComponent },
  // user views
  { path: 'register', component: RegisterViewComponent },
  { path: 'login', component: LoginViewComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
