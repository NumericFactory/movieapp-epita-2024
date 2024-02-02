import { Component } from '@angular/core';
import { TmdbService } from '../../../shared/services/tmdb.service';
import { MovieModel } from '../../../shared/models/movie.model';
import { Observable, Subscription } from 'rxjs';
import { Genre, genresMovie } from '../../../shared/data/genres.data';

@Component({
  selector: 'app-movie-list-view',
  templateUrl: './movie-list-view.component.html',
  styleUrl: './movie-list-view.component.scss'
})
export class MovieListViewComponent {

  movies$: Observable<MovieModel[]> = this.tmdbSvc.getMoviesFromApi();
  genres: Genre[] = genresMovie;
  subscription!: Subscription;

  constructor(private tmdbSvc: TmdbService) { }
  /**
     * getMoviesFromApi()
     * retourne tmdbSvc.movies$$.asObservable()
     * 
     * donc je peux subscribe à cette source
     * this.subscription = this.tmdbSvc.getMoviesFromApi().subscribe(data => this.movies = data) 
     * 
     * ou directement avec le pipe async dans la view...
     * @for (itemMovie of movies$ | async ; track itemMovie.id)
     * 
     * 
     */

  selectGenre(genre: Genre) {
    console.log(genre)
    // Request TMDV /movie/
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe()
  // }
}
