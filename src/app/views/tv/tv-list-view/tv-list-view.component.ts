import { Component } from '@angular/core';
import { TvShowModel } from '../../../shared/models/tv-show.model';
import { MovieService } from '../../../shared/services/movie.service';
import { Observable } from 'rxjs';
import { Genre, genresTv } from '../../../shared/data/genres.data';

@Component({
  selector: 'app-tv-list-view',
  templateUrl: './tv-list-view.component.html',
  styleUrl: './tv-list-view.component.scss'
})
export class TvListViewComponent {

  tvshows$: Observable<TvShowModel[]> = this.movieSvc.getTvShowFromApi();
  genres: Genre[] = genresTv;

  constructor(private movieSvc: MovieService) { }

  selectGenre(genre: Genre) {
    console.log(genre)
  }

}
