import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListViewComponent } from './views/movie-list-view/movie-list-view.component';
import { TvListViewComponent } from './views/tv-list-view/tv-list-view.component';
import { MovieDetailViewComponent } from './views/movie-detail-view/movie-detail-view.component';
import { HomeViewComponent } from './views/home-view/home-view.component';

const routes: Routes = [
  // ajouter mes routes
  { path: '', component: HomeViewComponent },
  { path: 'movies', component: MovieListViewComponent },
  { path: 'tv', component: TvListViewComponent },
  { path: 'movies/:id', component: MovieDetailViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
