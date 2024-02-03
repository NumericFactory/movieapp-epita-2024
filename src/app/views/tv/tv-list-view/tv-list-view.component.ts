import { Component } from '@angular/core';
import { TvShowModel } from '../../../shared/models/tv-show.model';
import { TMDBService } from '../../../shared/services/tmdb.service';
import { Observable } from 'rxjs';
import { Genre, genresTv } from '../../../shared/data/genres.data';

@Component({
  selector: 'app-tv-list-view',
  templateUrl: './tv-list-view.component.html',
  styleUrl: './tv-list-view.component.scss'
})
export class TvListViewComponent {

  tvshows$: Observable<TvShowModel[]> = this._TMDBSvc.getTvShowFromApi();
  genres: Genre[] = genresTv;

  constructor(private _TMDBSvc: TMDBService) { }

  selectGenre(genre: Genre) {
    console.log(genre)
  }

}
