import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListViewComponent } from './views/movie-list-view/movie-list-view.component';
import { TvListViewComponent } from './views/tv-list-view/tv-list-view.component';

const routes: Routes = [
  // ajouter mes routes
  { path: '', component: MovieListViewComponent },
  { path: 'tv', component: TvListViewComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
