import { Component } from '@angular/core';
import { MovieService } from '../../../shared/services/movie.service';
import { MovieModel } from '../../../shared/models/movie.model';
import { Observable } from 'rxjs';
import { Genre, genresMovie } from '../../../shared/data/genres.data';

@Component({
  selector: 'app-movie-list-view',
  templateUrl: './movie-list-view.component.html',
  styleUrl: './movie-list-view.component.scss'
})
export class MovieListViewComponent {

  movies$: Observable<MovieModel[]> = this.movieSvc.getMoviesFromApi();
  genres: Genre[] = genresMovie;

  constructor(private movieSvc: MovieService) { }
  /**
     * getMoviesFromApi()
     * retourne movieSvc.movies$$.asObservable()
     * 
     * donc je peux subscribe à cette source
     * this.movieSvc.getMoviesFromApi().subscribe(data => this.movies = data) 
     * 
     * ou directement avec le pipe async dans la view...
     * @for (itemMovie of movies$ | async ; track itemMovie.id)
     * 
     */

  selectGenre(genre: Genre) {
    console.log(genre)
  }
}
