import { Component } from '@angular/core';
import { TMDBService } from '../../../core/adapters/tmdb.service';
import { MovieModel } from '../../../core/models/movie.model';
import { Observable, Subscription } from 'rxjs';
import { Genre, genresMovie } from '../../../shared/data/genres.data';
import { APIExternalMoviesGateway } from '../../../core/ports/api-external-movies.gateway';

@Component({
  selector: 'app-movie-list-view',
  templateUrl: './movie-list-view.component.html',
  styleUrl: './movie-list-view.component.scss'
})
export class MovieListViewComponent {

  movies$: Observable<MovieModel[]> = this._TMDBSvc.getMoviesFromApi();
  genres: Genre[] = genresMovie;
  subscription!: Subscription;

  constructor(
    // private _TMDBSvc: TMDBService
    private _TMDBSvc: APIExternalMoviesGateway
  ) { }
  /**
     * getMoviesFromApi()
     * retourne _TMDBSvc.movies$$.asObservable()
     * 
     * donc je peux subscribe à cette source
     * this.subscription = this._TMDBSvc.getMoviesFromApi().subscribe(data => this.movies = data) 
     * 
     * ou directement avec le pipe async dans la view...
     * @for (itemMovie of movies$ | async ; track itemMovie.id)
     * 
     * 
     */

  ngOnInit() {
    this._TMDBSvc.getMoviesFromApi()
  }

  selectGenre(genre: Genre) {
    console.log(genre)
    // Request TMDV /movie/
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe()
  // }
}
