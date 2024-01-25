import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListViewComponent } from './views/movies/movie-list-view/movie-list-view.component';
import { TvListViewComponent } from './views/tv/tv-list-view/tv-list-view.component';
import { MovieDetailViewComponent } from './views/movies/movie-detail-view/movie-detail-view.component';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { SearchViewComponent } from './views/search-view/search-view.component';
import { RegisterViewComponent } from './views/user/register-view/register-view.component';
import { LoginViewComponent } from './views/user/login-view/login-view.component';

const routes: Routes = [
  // ajouter mes routes
  { path: '', component: HomeViewComponent },
  { path: 'search', component: SearchViewComponent },
  { path: 'movies', component: MovieListViewComponent },
  { path: 'tv', component: TvListViewComponent },
  { path: 'register', component: RegisterViewComponent },
  { path: 'login', component: LoginViewComponent },

  { path: 'movies/:id', component: MovieDetailViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
