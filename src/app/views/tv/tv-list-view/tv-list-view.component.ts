import { Component } from '@angular/core';
import { TvShowModel } from '../../../core/models/tv-show.model';
import { Observable } from 'rxjs';
import { Genre, genresTv } from '../../../shared/data/genres.data';
import { APIExternalMoviesGateway } from '../../../core/ports/api-external-movies.gateway';

@Component({
  selector: 'app-tv-list-view',
  templateUrl: './tv-list-view.component.html',
  styleUrl: './tv-list-view.component.scss'
})
export class TvListViewComponent {

  tvshows$: Observable<TvShowModel[]> = this._TMDBSvc.getTvShowFromApi();
  genres: Genre[] = genresTv;

  constructor(
    // private _TMDBSvc: TMDBService,
    private _TMDBSvc: APIExternalMoviesGateway
  ) { }

  selectGenre(genre: Genre) {
    console.log(genre)
  }

}
