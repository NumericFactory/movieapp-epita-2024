import { Component } from '@angular/core';
import { TvShowModel } from '../../../shared/models/tv-show.model';
import { MovieService } from '../../../shared/services/movie.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tv-list-view',
  templateUrl: './tv-list-view.component.html',
  styleUrl: './tv-list-view.component.scss'
})
export class TvListViewComponent {

  // variable d'affichage
  tvshows$: Observable<TvShowModel[]> = this.movieSvc.getTvShowFromApi();

  constructor(private movieSvc: MovieService) { }

}
